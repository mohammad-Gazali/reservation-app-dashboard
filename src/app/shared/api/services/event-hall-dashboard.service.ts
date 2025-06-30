import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateEventHallRequest,
  CreateEventHallResponse,
  DeleteEventHallRequest,
  DeleteEventHallResponse,
  GetEventHallReservationsRequest,
  GetEventHallReservationsResponse,
  CloseEventHallRequest,
  CloseEventHallResponse,
  RejectReservationRequest,
  RejectReservationResponse
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class EventHallDashboardService {

  private http = inject(HttpClient);
  private apiPrefix = '/api/eventhalls-dashboard';

  createEventHall(data: CreateEventHallRequest) {
    const formData = new FormData();
    formData.append('ar_title', data.ar_title);
    formData.append('en_title', data.en_title);
    formData.append('image', data.image);
    formData.append('en_location', data.en_location);
    formData.append('ar_location', data.ar_location);
    formData.append('capicity', data.capicity.toString());
    formData.append('price', data.price.toString());

    return this.http.post<CreateEventHallResponse>(`${this.apiPrefix}/create`, formData);
  }

  deleteEventHall(data: DeleteEventHallRequest) {
    return this.http.post<DeleteEventHallResponse>(`${this.apiPrefix}/delete`, data);
  }

  getReservations(data: GetEventHallReservationsRequest) {
    return this.http.post<GetEventHallReservationsResponse>(
      `${this.apiPrefix}/reservations`,
      data
    );
  }

  closeEventHall(data: CloseEventHallRequest) {
    return this.http.post<CloseEventHallResponse>(`${this.apiPrefix}/close`, data);
  }

  rejectReservation(data: RejectReservationRequest) {
    return this.http.post<RejectReservationResponse>(`${this.apiPrefix}/reject`, data);
  }
}