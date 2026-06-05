import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

interface AccessTokenClaims {
  sub?: string;
  resource_access?: Record<string, { roles?: string[] }>;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly oauth = inject(OAuthService);

  login(): void {
    this.oauth.initCodeFlow();
  }

  logout(): void {
    this.oauth.logOut();
  }

  isLoggedIn(): boolean {
    return this.oauth.hasValidAccessToken();
  }

  getUserId(): string | null {
    return this.decodeAccessToken()?.sub ?? null;
  }

  get roles(): string[] {
    const claims = this.decodeAccessToken();
    const raw = claims?.resource_access?.[environment.apiClientName]?.roles ?? [];
    return raw.map((role) => role.replace(/^ROLE_/, ''));
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  get username(): string | null {
    const claims = this.oauth.getIdentityClaims() as { preferred_username?: string; name?: string } | null;
    return claims?.preferred_username ?? claims?.name ?? null;
  }

  private decodeAccessToken(): AccessTokenClaims | null {
    const token = this.oauth.getAccessToken();
    if (!token) {
      return null;
    }
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }
    try {
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(json) as AccessTokenClaims;
    } catch {
      return null;
    }
  }
}
