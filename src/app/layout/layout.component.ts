import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet, RouterModule } from '@angular/router';
import { layoutRoutes } from 'app/constants';
import { map, shareReplay } from 'rxjs/operators';
import { LayoutSettingsComponent } from "./layout-settings.component";
import { LayoutBreadcrumbsComponent } from "./layout-breadcrumbs.component";

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
]
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

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
}
