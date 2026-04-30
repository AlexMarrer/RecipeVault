package uscata.alex.recipevault.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class AuthenticationRoleConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationRoleConverter.class);
    private final JwtGrantedAuthoritiesConverter defaultGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
    private final String clientName;

    public AuthenticationRoleConverter(String clientName) {
        defaultGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        defaultGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        this.clientName = clientName;
    }

    @SuppressWarnings("unchecked")
    private Collection<? extends GrantedAuthority> extractResourceRoles(final Jwt jwt) {
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        if (resourceAccess != null && resourceAccess.containsKey(clientName)) {
            Map<String, Object> client = (Map<String, Object>) resourceAccess.get(clientName);
            if (client != null && client.containsKey("roles")) {
                Collection<String> resourceRoles = (Collection<String>) client.get("roles");
                logger.debug("Extracted client roles: {}", resourceRoles);
                return resourceRoles.stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toSet());
            }
        }
        return Collections.emptySet();
    }

    @Override
    public AbstractAuthenticationToken convert(final Jwt source) {
        Collection<GrantedAuthority> authorities = Stream.concat(
                defaultGrantedAuthoritiesConverter.convert(source).stream(),
                extractResourceRoles(source).stream()
        ).collect(Collectors.toSet());
        return new JwtAuthenticationToken(source, authorities);
    }
}