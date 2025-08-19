import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateHotelRequest,
  CreateHotelResponse,
  DeleteHotelRequest,
  DeleteHotelResponse,
  RejectReservationRequest,
  RejectReservationResponse,
  CloseHotelRequest,
  CloseHotelResponse,
  GetReservationsRequest,
  GetReservationsResponse,
  CreateHotelRoomRequest,
  CreateHotelRoomResponse,
  DeleteHotelRoomRequest,
  DeleteHotelRoomResponse,
  Hotel
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class HotelDashboardService {

  private http = inject(HttpClient);
  private apiPrefix = '/api/hotels-dashboard';

  getHotelsList() {
    return this.http.get<Hotel[]>('/api/hotels')
  }

  createHotel(data: CreateHotelRequest) {
    const formData = new FormData();
    formData.append('ar_title', data.ar_title);
    formData.append('en_title', data.en_title);
    formData.append('image', data.image);
    formData.append('en_location', data.en_location);
    formData.append('ar_location', data.ar_location);

    return this.http.post<CreateHotelResponse>(`${this.apiPrefix}/create`, formData);
  }

  deleteHotel(data: DeleteHotelRequest) {
    return this.http.post<DeleteHotelResponse>(`${this.apiPrefix}/delete`, data);
  }

  rejectReservation(data: RejectReservationRequest) {
    return this.http.post<RejectReservationResponse>(`${this.apiPrefix}/reject`, data);
  }

  closeHotel(data: CloseHotelRequest) {
    return this.http.post<CloseHotelResponse>(`${this.apiPrefix}/close`, data);
  }

  getReservations(data: GetReservationsRequest) {
    return this.http.post<GetReservationsResponse>(
      `${this.apiPrefix}/reservations`,
      data
    );
  }

  createRoom(data: CreateHotelRoomRequest) {
    return this.http.post<CreateHotelRoomResponse>(`${this.apiPrefix}/create-room`, data);
  }

  deleteRoom(data: DeleteHotelRoomRequest) {
    return this.http.post<DeleteHotelRoomResponse>(`${this.apiPrefix}/delete-room`, data);
  }
}
