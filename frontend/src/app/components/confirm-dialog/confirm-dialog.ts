import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButtonModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialog {
  readonly title = input('Bestätigen');
  readonly message = input('Möchtest du diese Aktion wirklich ausführen?');
  readonly confirmLabel = input('Löschen');
  readonly cancelLabel = input('Abbrechen');
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}
