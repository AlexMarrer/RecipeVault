import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { HasRoleDirective } from '../../directives/has-role.directive';
import { MANAGE_ROLES } from '../../core/roles';
import { RouteUrl } from '../../core/routes';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    HasRoleDirective,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private readonly auth = inject(AuthService);

  protected readonly manageRoles = MANAGE_ROLES;
  protected readonly recipesActiveMatch: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    matrixParams: 'ignored',
    fragment: 'ignored',
  };

  protected readonly recipesUrl = RouteUrl.recipes;
  protected readonly myRecipesUrl = RouteUrl.myRecipes;
  protected readonly categoriesUrl = RouteUrl.adminCategories;
  protected readonly ingredientsUrl = RouteUrl.adminIngredients;

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  username(): string | null {
    return this.auth.username;
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }
}
