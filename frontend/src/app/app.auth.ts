import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.issuer,
  clientId: environment.clientId,
  redirectUri: globalThis.location.origin,
  postLogoutRedirectUri: globalThis.location.origin,
  responseType: 'code',
  scope: 'openid profile email',
  requireHttps: false,
};
