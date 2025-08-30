import { Component } from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinner],
  template: `
    <mat-progress-spinner mode="indeterminate" />
  `,
  styles: `
    :host {
      background-color: #000000a1;
      position: fixed;
      z-index: 10;
      inset: 0;
      display: grid;
      place-items: center;
    }

    mat-progress-spinner {
      width: 5rem;
      height: 5rem;
      --mat-progress-spinner-active-indicator-color: var(--mat-sys-secondary-fixed-dim);
    }
  `,
})
export class LoaderComponent {
}