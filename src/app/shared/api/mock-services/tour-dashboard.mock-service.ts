import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  Tour,
  TourStop,
  ToursReservation,
  CreateTourRequest,
  CreateTourResponse,
  DeleteTourRequest,
  DeleteTourResponse,
  GetTourReservationsRequest,
  GetTourReservationsResponse,
  CreateTourStopRequest,
  CreateTourStopResponse,
  DeleteTourStopRequest,
  DeleteTourStopResponse
} from '../types/tour-dashboard';
import {
  RejectReservationRequest,
  RejectReservationResponse
} from '../types/reservation';

@Injectable({
  providedIn: 'root'
})
export class MockTourDashboardService {
  // Mock data
  private tours: Tour[] = [
    {
      id: 1,
      category_id: 1,
      ar_title: 'جولة في الرياض التاريخية',
      en_title: 'Historical Riyadh Tour',
      ar_description: 'جولة شيقة في معالم الرياض التاريخية',
      en_description: 'Exciting tour of historical landmarks in Riyadh',
      image: 'assets/images/tours/tour-1.jpg',
      price: 250,
      start_date: '2025-09-01T08:00:00Z',
      end_date: '2025-09-01T17:00:00Z',
      created_at: '2025-06-15T10:00:00Z',
      updated_at: '2025-06-15T10:00:00Z'
    },
    {
      id: 2,
      category_id: 2,
      ar_title: 'جولة سياحية في جدة البلد',
      en_title: 'Jeddah Al-Balad Tour',
      ar_description: 'استكشف التراث العمراني الفريد في جدة البلد',
      en_description: 'Explore the unique architectural heritage of Jeddah Al-Balad',
      image: 'assets/images/tours/tour-2.jpg',
      price: 180,
      start_date: '2025-09-10T09:00:00Z',
      end_date: '2025-09-10T16:00:00Z',
      created_at: '2025-06-20T11:30:00Z',
      updated_at: '2025-06-20T11:30:00Z'
    }
  ];

  private stops: TourStop[] = [
    {
      id: 1,
      tour_id: 1,
      sequence: 1,
      ar_title: 'قصر المصمك',
      en_title: 'Masmak Fortress',
      ar_description: 'قلعة طينية تاريخية في قلب الرياض',
      en_description: 'Historical clay fortress in the heart of Riyadh',
      image: 'assets/images/tours/stops/stop-1.jpg',
      created_at: '2025-06-15T10:00:00Z',
      updated_at: '2025-06-15T10:00:00Z'
    },
    {
      id: 2,
      tour_id: 1,
      sequence: 2,
      ar_title: 'المتحف الوطني',
      en_title: 'National Museum',
      ar_description: 'يضم معارض عن تاريخ المملكة العربية السعودية',
      en_description: 'Features exhibits on the history of Saudi Arabia',
      image: 'assets/images/tours/stops/stop-2.jpg',
      created_at: '2025-06-15T10:00:00Z',
      updated_at: '2025-06-15T10:00:00Z'
    }
  ];

  private reservations: ToursReservation[] = [
    {
      id: 1,
      user_id: 1,
      tour_id: 1,
      coupons_id: null,
      guests: 2,
      price: 500,
      final_price: 475,
      payment_method: 'credit_card',
      status: 'confirmed',
      start_date: '2025-09-01T08:00:00Z',
      end_date: '2025-09-01T17:00:00Z',
      discount_applied: true,
      created_at: '2025-07-10T14:30:00Z',
      updated_at: '2025-07-10T14:30:00Z'
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
  getToursList() {
    return this.successResponse(this.tours);
  }

  createTour(data: CreateTourRequest): Observable<CreateTourResponse> {
    const newTour: Tour = {
      id: this.tours.length + 1,
      category_id: 1, // Default category
      ar_title: data.ar_title,
      en_title: data.en_title,
      ar_description: data.ar_description,
      en_description: data.en_description,
      image: URL.createObjectURL(data.image as unknown as Blob),
      price: data.price,
      start_date: data.start_date,
      end_date: data.end_date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.tours = [...this.tours, newTour];
    
    return this.successResponse<CreateTourResponse>({
      message: 'Tour created successfully',
      tour: newTour
    });
  }

  deleteTour(data: DeleteTourRequest): Observable<DeleteTourResponse> {
    const tourIndex = this.tours.findIndex(t => t.id === data.tour_id);
    
    if (tourIndex === -1) {
      return this.errorResponse('Tour not found');
    }

    this.tours = this.tours.filter(t => t.id !== data.tour_id);
    
    return this.successResponse<DeleteTourResponse>({
      message: 'Tour deleted successfully'
    });
  }

  getReservations(data: GetTourReservationsRequest): Observable<GetTourReservationsResponse> {
    const tourReservations = this.reservations.filter(
      r => r.tour_id === data.tour_id
    );
    
    return this.successResponse<GetTourReservationsResponse>({
      message: 'Reservations retrieved successfully',
      reservations: tourReservations
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

  createTourStop(data: CreateTourStopRequest): Observable<CreateTourStopResponse> {
    const newStop: TourStop = {
      id: this.stops.length + 1,
      tour_id: data.tour_id,
      sequence: this.stops.filter(s => s.tour_id === data.tour_id).length + 1,
      ar_title: data.ar_title,
      en_title: data.en_title,
      ar_description: data.ar_description,
      en_description: data.en_description,
      image: URL.createObjectURL(data.image as unknown as Blob),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.stops = [...this.stops, newStop];
    
    return this.successResponse<CreateTourStopResponse>({
      message: 'Tour stop created successfully',
      stop: newStop
    });
  }

  deleteTourStop(data: DeleteTourStopRequest): Observable<DeleteTourStopResponse> {
    const stopIndex = this.stops.findIndex(s => s.id === data.tour_stop_id);
    
    if (stopIndex === -1) {
      return this.errorResponse('Tour stop not found');
    }

    this.stops = this.stops.filter(s => s.id !== data.tour_stop_id);
    
    return this.successResponse<DeleteTourStopResponse>({
      message: 'Tour stop deleted successfully'
    });
  }
}
