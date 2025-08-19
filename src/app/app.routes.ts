import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './common/home/home.component';
import { HotelsComponent } from './features/hotels/hotels.component';
import { RestaurantsComponent } from './features/restaurants/restaurants.component';
import { ToursComponent } from './features/tours/tours.component';
import { EventHallsComponent } from './features/event-halls/event-halls.component';
import { PlaygroundsComponent } from './features/playgrounds/playgrounds.component';
import { AdminsComponent } from './features/admins/admins.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
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
];
