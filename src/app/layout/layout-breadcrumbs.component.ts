import { Component, inject } from '@angular/core';
import {
  BreadcrumbsComponent,
  BreadcrumbItemDirective,
} from './breadcrumbs/breadcrumbs.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-layout-breadcrumbs',
  imports: [BreadcrumbsComponent, BreadcrumbItemDirective, MatButton, RouterLink, MatIcon, MatIconButton],
  template: `
    <app-breadcrumbs aria-label="Breadcrumbs with links">
      <a
        matIconButton
        *appBreadcrumbItem 
        routerLink="/"
      >
        <mat-icon>home</mat-icon>
      </a>
      @for (breadcrumb of breadcrumbs(); track breadcrumb.url) {
        <a
          matButton 
          *appBreadcrumbItem 
          [routerLink]="breadcrumb.url"
        >
          {{ breadcrumb.label }}
        </a>
      }
    </app-breadcrumbs>
  `,
})
export class LayoutBreadcrumbsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected breadcrumbs = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.createBreadcrumbs(this.route)),
    ),
    {
      initialValue: [],
    }
  );

  private createBreadcrumbs(
    route: ActivatedRoute, 
    url: string = '',
    breadcrumbs: BreadcrumbUrl[] = []
  ): BreadcrumbUrl[] {
    const children = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      breadcrumbs.push({ label: child.snapshot.data['breadcrumb'] ?? 'NOT_IMPLEMENTED_ROUTE_SEGMENT', url: url });
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}

type BreadcrumbUrl = {
  label: string
  url: string
}