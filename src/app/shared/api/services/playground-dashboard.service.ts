import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreatePlayGroundRequest,
  CreatePlayGroundResponse,
  DeletePlayGroundRequest,
  DeletePlayGroundResponse,
  GetPlayGroundReservationsRequest,
  GetPlayGroundReservationsResponse,
  ClosePlayGroundRequest,
  ClosePlayGroundResponse,
  RejectReservationRequest,
  RejectReservationResponse,
  PlayGround
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundDashboardService {

  private http = inject(HttpClient);
  private apiPrefix = '/api/playgrounds-dashboard';

  getPlaygroundsList() {
    return this.http.get<PlayGround[]>('/api/playgrounds')
  }

  createPlayground(data: CreatePlayGroundRequest) {
    const formData = new FormData();
    formData.append('sport', data.sport);
    formData.append('ar_title', data.ar_title);
    formData.append('en_title', data.en_title);
    formData.append('image', data.image);
    formData.append('en_location', data.en_location);
    formData.append('ar_location', data.ar_location);
    formData.append('price', data.price.toString());
    formData.append('capicity', data.capicity.toString());

    return this.http.post<CreatePlayGroundResponse>(`${this.apiPrefix}/create`, formData);
  }

  deletePlayground(data: DeletePlayGroundRequest) {
    return this.http.post<DeletePlayGroundResponse>(`${this.apiPrefix}/delete`, data);
  }

  getReservations(data: GetPlayGroundReservationsRequest) {
    return this.http.post<GetPlayGroundReservationsResponse>(
      `${this.apiPrefix}/reservations`,
      data
    );
  }

  closePlayground(data: ClosePlayGroundRequest) {
    return this.http.post<ClosePlayGroundResponse>(`${this.apiPrefix}/close`, data);
  }

  rejectReservation(data: RejectReservationRequest) {
    return this.http.post<RejectReservationResponse>(`${this.apiPrefix}/reject`, data);
  }
}