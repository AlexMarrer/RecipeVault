export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:9090/api',
  issuer: 'http://localhost:8080/realms/recipevault',
  clientId: 'recipevault-frontend',
  // Backend-Client, unter dem die Rollen im Token stehen (resource_access.<apiClientName>.roles)
  apiClientName: 'recipevault',
};
