import { Provider } from '@angular/core';
import { AdminDashboardService, EventHallDashboardService, HotelDashboardService, PlaygroundDashboardService, RestaurantDashboardService, TourDashboardService } from '../services';
import { MockAdminDashboardService } from './admin-dashboard.mock-service';
import { MockEventHallDashboardService } from './event-hall-dashboard.mock-service';
import { MockHotelDashboardService } from './hotel-dashboard.mock-service';
import { MockPlaygroundDashboardService } from './playground-dashboard.mock-service';
import { MockRestaurantDashboardService } from './restaurant-dashboard.mock-service';
import { MockTourDashboardService } from './tour-dashboard.mock-service';

export const provideMockApiData = (): Provider[] => {
    return [
        {
            provide: HotelDashboardService,
            useClass: MockHotelDashboardService
        },
        {
            provide: RestaurantDashboardService,
            useClass: MockRestaurantDashboardService
        },
        {
            provide: TourDashboardService,
            useClass: MockTourDashboardService
        },
        {
            provide: EventHallDashboardService,
            useClass: MockEventHallDashboardService
        },
        {
            provide: PlaygroundDashboardService,
            useClass: MockPlaygroundDashboardService
        },
        {
            provide: AdminDashboardService,
            useClass: MockAdminDashboardService
        }
    ]
}