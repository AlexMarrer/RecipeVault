import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.issuer,
  clientId: environment.clientId,
  redirectUri: window.location.origin,
  postLogoutRedirectUri: window.location.origin,
  responseType: 'code',
  scope: 'openid profile email',
  // Keycloak läuft im Dev auf http://localhost:8080 (kein HTTPS)
  requireHttps: false,
};
