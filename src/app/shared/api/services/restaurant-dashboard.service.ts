import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateRestaurantRequest,
  CreateRestaurantResponse,
  DeleteRestaurantRequest,
  DeleteRestaurantResponse,
  GetReservationsRequest,
  GetReservationsResponse,
  CloseRestaurantRequest,
  CloseRestaurantResponse,
  RejectReservationRequest,
  RejectReservationResponse,
  Restaurant
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDashboardService {

  private http = inject(HttpClient);
  private apiPrefix = '/api/restaurants-dashboard';

  getRestaurantsList() {
    return this.http.get<Restaurant[]>('/api/restaurants')
  }

  createRestaurant(data: CreateRestaurantRequest) {
    const formData = new FormData();
    formData.append('ar_title', data.ar_title);
    formData.append('en_title', data.en_title);
    formData.append('image', data.image);
    formData.append('capacity', data.capacity.toString());
    formData.append('ar_location', data.ar_location);
    formData.append('en_location', data.en_location);

    return this.http.post<CreateRestaurantResponse>(`${this.apiPrefix}/create`, formData);
  }

  deleteRestaurant(data: DeleteRestaurantRequest) {
    return this.http.post<DeleteRestaurantResponse>(`${this.apiPrefix}/delete`, data);
  }

  getReservations(data: GetReservationsRequest) {
    return this.http.post<GetReservationsResponse>(`${this.apiPrefix}/reservations`, data);
  }

  closeRestaurant(data: CloseRestaurantRequest) {
    return this.http.post<CloseRestaurantResponse>(`${this.apiPrefix}/close`, data);
  }

  rejectReservation(data: RejectReservationRequest) {
    return this.http.post<RejectReservationResponse>(`${this.apiPrefix}/reject`, data);
  }
}