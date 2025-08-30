import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader.component';
import { LOADING } from '@shared/services/loading.token';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  template: `
    @if (loading()) {
      <app-loader />
    }
    <router-outlet />
  `,
})
export class AppComponent {
  protected loading = inject(LOADING);
}
