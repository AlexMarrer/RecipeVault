import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { RouteUrl } from '../core/routes';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    auth.login();
    return false;
  }

  const required = (route.data?.['roles'] as string[] | undefined) ?? [];
  if (required.length === 0 || required.some((role) => auth.hasRole(role))) {
    return true;
  }

  return router.parseUrl(RouteUrl.forbidden);
};
