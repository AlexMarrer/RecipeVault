import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteUrl } from '../../core/routes';

@Component({
  selector: 'app-forbidden',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="forbidden">
      <h1 class="forbidden__heading">403 – Kein Zugriff</h1>
      <p class="forbidden__text">Du hast nicht die nötige Rolle für diesen Bereich.</p>
      <a class="forbidden__link" [routerLink]="recipesUrl">Zurück zu den Rezepten</a>
    </section>
  `,
})
export class ForbiddenPage {
  protected readonly recipesUrl = RouteUrl.recipes;
}
