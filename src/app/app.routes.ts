import { Router, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './common/home/home.component';
import { HotelsComponent } from './features/hotels/hotels.component';
import { RestaurantsComponent } from './features/restaurants/restaurants.component';
import { ToursComponent } from './features/tours/tours.component';
import { EventHallsComponent } from './features/event-halls/event-halls.component';
import { PlaygroundsComponent } from './features/playgrounds/playgrounds.component';
import { AdminsComponent } from './features/admins/admins.component';
import { LoginComponent } from './common/login.component';
import { NotFoundComponent } from './common/not-found.component';
import { inject } from '@angular/core';

import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);

        return toObservable(auth.currentUser).pipe(
          filter(user => user !== undefined),
          map(Boolean),
          tap(canActivate => {
            if (!canActivate) {
              router.navigateByUrl('login');
            }
          }),
        );
      },
    ],
    children: [
      { 
        path: '',
        component: HomeComponent,
        data: { breadcrumb: 'Home' },
      },
      { 
        path: 'hotels',
        component: HotelsComponent,
        data: { breadcrumb: 'Hotels' },
      },
      { 
        path: 'restaurants', 
        component: RestaurantsComponent,
        data: { breadcrumb: 'Restaurants' },
      },
      { 
        path: 'tours',
        component: ToursComponent,
        data: { breadcrumb: 'Tours' },
      },
      { 
        path: 'event-halls',
        component: EventHallsComponent,
        data: { breadcrumb: 'Event Halls' },
      },
      { 
        path: 'playgrounds',
        component: PlaygroundsComponent,
        data: { breadcrumb: 'Playgrounds' },
      },
      { 
        path: 'admins',
        component: AdminsComponent,
        data: { breadcrumb: 'Admins' },
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);

        return toObservable(auth.currentUser).pipe(
          map(user => !user),
          tap(canActivate => {
            if (!canActivate) {
              router.navigateByUrl('/');
            }
          }),
        );
      }
    ]
  },
  {
    path: "**",
    pathMatch: "full",
    component: NotFoundComponent,
  }
];
