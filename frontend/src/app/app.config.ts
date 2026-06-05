import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { authConfig } from './app.auth';
import { authInterceptor } from './core/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideOAuthClient(),
    provideAppInitializer(async () => {
      const oauth = inject(OAuthService);
      oauth.configure(authConfig);
      try {
        await oauth.loadDiscoveryDocumentAndTryLogin();
        oauth.setupAutomaticSilentRefresh();
      } catch (err) {
        console.error('OAuth-Initialisierung fehlgeschlagen (läuft Keycloak auf :8080?)', err);
      }
    }),
  ],
};
