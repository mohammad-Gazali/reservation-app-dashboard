import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { layoutRoutes } from 'app/constants';
import { map, shareReplay } from 'rxjs/operators';
import { LayoutSettingsComponent } from "./layout-settings.component";
import { LayoutBreadcrumbsComponent } from "./layout-breadcrumbs.component";
import { AuthService } from '@shared/services/auth.service';
import { AUTH_TOKEN_KEY } from '@shared/constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    MatToolbar,
    MatIconButton,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatIcon,
    RouterOutlet,
    RouterModule,
    LayoutSettingsComponent,
    LayoutBreadcrumbsComponent,
    MatButton
]
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private auth = inject(AuthService);
  private router = inject(Router);

  protected isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    )
  );

  protected sidenavRoutes = [
    {
      title: 'Home',
      path: '/',
      icon: 'home',
    },
    ...layoutRoutes,
  ]

  logout() {
    this.auth.currentUser.set(null);
    this.router.navigateByUrl('login');
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
