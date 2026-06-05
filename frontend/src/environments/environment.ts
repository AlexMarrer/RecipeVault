export const environment = {
  production: true,
  apiBaseUrl: 'http://localhost:9090/api',
  issuer: 'http://localhost:8080/realms/recipevault',
  clientId: 'recipevault',
  // Backend-Client, unter dem die Rollen im Token stehen (resource_access.<apiClientName>.roles)
  apiClientName: 'recipevault',
};
