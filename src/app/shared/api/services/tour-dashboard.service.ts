import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateTourRequest,
  CreateTourResponse,
  DeleteTourRequest,
  DeleteTourResponse,
  GetTourReservationsRequest,
  GetTourReservationsResponse,
  RejectReservationRequest,
  RejectReservationResponse,
  CreateTourStopRequest,
  CreateTourStopResponse,
  DeleteTourStopRequest,
  DeleteTourStopResponse
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class TourDashboardService {
  private http = inject(HttpClient);
  private apiPrefix = '/api/tours-dashboard';

  createTour(data: CreateTourRequest) {
    const formData = new FormData();
    formData.append('ar_title', data.ar_title);
    formData.append('en_title', data.en_title);
    formData.append('ar_description', data.ar_description);
    formData.append('en_description', data.en_description);
    formData.append('image', data.image);
    formData.append('price', data.price.toString());
    formData.append('start_date', data.start_date);
    formData.append('end_date', data.end_date);

    return this.http.post<CreateTourResponse>(`${this.apiPrefix}/create`, formData);
  }

  deleteTour(data: DeleteTourRequest) {
    return this.http.post<DeleteTourResponse>(`${this.apiPrefix}/delete`, data);
  }

  getReservations(data: GetTourReservationsRequest) {
    return this.http.post<GetTourReservationsResponse>(
      `${this.apiPrefix}/reservations`,
      data
    );
  }

  rejectReservation(data: RejectReservationRequest) {
    return this.http.post<RejectReservationResponse>(`${this.apiPrefix}/reject`, data);
  }

  createStop(data: CreateTourStopRequest) {
    const formData = new FormData();
    formData.append('tour_id', data.tour_id.toString());
    formData.append('ar_title', data.ar_title);
    formData.append('en_title', data.en_title);
    formData.append('ar_description', data.ar_description);
    formData.append('en_description', data.en_description);
    formData.append('image', data.image);

    return this.http.post<CreateTourStopResponse>(`${this.apiPrefix}/create-stop`, formData);
  }

  deleteStop(data: DeleteTourStopRequest) {
    return this.http.post<DeleteTourStopResponse>(`${this.apiPrefix}/delete-stop`, data);
  }
}