import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  Restaurant,
  RestaurantReservation,
  CreateRestaurantRequest,
  CreateRestaurantResponse,
  DeleteRestaurantRequest,
  DeleteRestaurantResponse,
  GetReservationsRequest,
  GetReservationsResponse,
  CloseRestaurantRequest,
  CloseRestaurantResponse
} from '../types/restaurant-dashboard';
import {
  RejectReservationRequest,
  RejectReservationResponse
} from '../types/reservation';

@Injectable({
  providedIn: 'root'
})
export class MockRestaurantDashboardService {
  // Mock data
  private restaurants: Restaurant[] = [
    {
      id: 1,
      category_id: 1,
      ar_title: 'مطعم الرياض الفاخر',
      en_title: 'Riyadh Fine Dining',
      image: 'assets/images/restaurants/restaurant-1.jpg',
      capacity: 100,
      ar_location: 'حي السفارات، الرياض',
      en_location: 'Diplomatic Quarter, Riyadh',
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: '2025-01-10T10:00:00Z',
      updated_at: '2025-01-10T10:00:00Z'
    },
    {
      id: 2,
      category_id: 2,
      ar_title: 'كافيه جدة الساحلي',
      en_title: 'Jeddah Seafront Cafe',
      image: 'assets/images/restaurants/restaurant-2.jpg',
      capacity: 50,
      ar_location: 'الكورنيش، جدة',
      en_location: 'Corniche, Jeddah',
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: '2025-02-15T11:30:00Z',
      updated_at: '2025-02-15T11:30:00Z'
    }
  ];

  private reservations: RestaurantReservation[] = [
    {
      id: 1,
      user_id: 1,
      restaurant_id: 1,
      reservation_time: '2025-08-15T19:00:00Z',
      area_type: 'indoor_hall',
      guests: 4,
      status: 'confirmed',
      created_at: '2025-07-05T10:00:00Z',
      updated_at: '2025-07-05T10:00:00Z'
    },
    {
      id: 2,
      user_id: 2,
      restaurant_id: 2,
      reservation_time: '2025-08-16T20:00:00Z',
      area_type: 'outdoor_terrace',
      guests: 2,
      status: 'confirmed',
      created_at: '2025-07-06T11:30:00Z',
      updated_at: '2025-07-06T11:30:00Z'
    }
  ];

  // Simulate API delay
  private readonly DELAY_MS = 500;

  // Helper to simulate API response
  private successResponse<T>(data: T): Observable<T> {
    return of(data).pipe(delay(this.DELAY_MS));
  }

  private errorResponse(message: string): Observable<never> {
    return throwError(() => new Error(message)).pipe(delay(this.DELAY_MS));
  }

  
  // Service methods
  getRestaurantsList() {
    return this.successResponse(this.restaurants);
  }
  
  createRestaurant(data: CreateRestaurantRequest): Observable<CreateRestaurantResponse> {
    const newRestaurant: Restaurant = {
      id: this.restaurants.length + 1,
      category_id: 1, // Default category
      ar_title: data.ar_title,
      en_title: data.en_title,
      image: URL.createObjectURL(data.image as unknown as Blob),
      capacity: data.capacity,
      ar_location: data.ar_location,
      en_location: data.en_location,
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.restaurants = [...this.restaurants, newRestaurant];
    
    return this.successResponse<CreateRestaurantResponse>({
      message: 'Restaurant created successfully',
      restaurant: newRestaurant
    });
  }

  deleteRestaurant(data: DeleteRestaurantRequest): Observable<DeleteRestaurantResponse> {
    const restaurantIndex = this.restaurants.findIndex(r => r.id === data.restaurant_id);
    
    if (restaurantIndex === -1) {
      return this.errorResponse('Restaurant not found');
    }

    this.restaurants = this.restaurants.filter(r => r.id !== data.restaurant_id);
    
    return this.successResponse<DeleteRestaurantResponse>({
      message: 'Restaurant deleted successfully'
    });
  }

  getReservations(data: GetReservationsRequest): Observable<GetReservationsResponse> {
    const restaurantReservations = this.reservations.filter(
      r => r.restaurant_id === data.restaurant_id
    );
    
    return this.successResponse<GetReservationsResponse>({
      message: 'Reservations retrieved successfully',
      reservations: restaurantReservations
    });
  }

  closeRestaurant(data: CloseRestaurantRequest): Observable<CloseRestaurantResponse> {
    const restaurant = this.restaurants.find(r => r.id === data.restaurant_id);
    
    if (!restaurant) {
      return this.errorResponse('Restaurant not found');
    }

    restaurant.is_closed = true;
    restaurant.closed_from = data.closed_from;
    restaurant.closed_until = data.closed_until;
    restaurant.updated_at = new Date().toISOString();
    
    return this.successResponse<CloseRestaurantResponse>({
      message: 'Restaurant closed successfully'
    });
  }

  rejectReservation(data: RejectReservationRequest): Observable<RejectReservationResponse> {
    const reservation = this.reservations.find(r => r.id === data.reservation_id);
    
    if (!reservation) {
      return this.errorResponse('Reservation not found');
    }

    reservation.status = 'rejected';
    reservation.updated_at = new Date().toISOString();
    
    return this.successResponse<RejectReservationResponse>({
      success: true,
      message: 'Reservation rejected successfully',
      reservation_id: data.reservation_id,
      new_status: 'rejected'
    });
  }
}
