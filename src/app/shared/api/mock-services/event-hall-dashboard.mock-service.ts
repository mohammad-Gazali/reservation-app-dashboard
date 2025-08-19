import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  EventHall,
  EventHallReservation,
  CreateEventHallRequest,
  CreateEventHallResponse,
  DeleteEventHallRequest,
  DeleteEventHallResponse,
  GetEventHallReservationsRequest,
  GetEventHallReservationsResponse,
  CloseEventHallRequest,
  CloseEventHallResponse
} from '../types/event-hall-dashboard';
import {
  RejectReservationRequest,
  RejectReservationResponse
} from '../types/reservation';

@Injectable({
  providedIn: 'root'
})
export class MockEventHallDashboardService {
  // Mock data
  private eventHalls: EventHall[] = [
    {
      id: 1,
      category_id: 1,
      ar_title: 'قاعة الأفراح الملكية',
      en_title: 'Royal Wedding Hall',
      image: 'assets/images/event-halls/hall-1.jpg',
      en_location: 'King Fahd Road, Riyadh',
      ar_location: 'طريق الملك فهد، الرياض',
      capicity: 500,
      price: 5000,
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: '2025-01-10T10:00:00Z',
      updated_at: '2025-01-10T10:00:00Z'
    },
    {
      id: 2,
      category_id: 2,
      ar_title: 'قاعة المناسبات الكبرى',
      en_title: 'Grand Events Hall',
      image: 'assets/images/event-halls/hall-2.jpg',
      en_location: 'Olaya District, Riyadh',
      ar_location: 'حي العليا، الرياض',
      capicity: 300,
      price: 3500,
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: '2025-02-15T11:30:00Z',
      updated_at: '2025-02-15T11:30:00Z'
    }
  ];

  private reservations: EventHallReservation[] = [
    {
      id: 1,
      user_id: 1,
      event_hall_id: 1,
      coupons_id: null,
      event_type: 'wedding',
      reservation_date: '2025-10-15',
      reservation_time: '19:00',
      guests: 300,
      price: 5000,
      final_price: 4750,
      discount_applied: true,
      payment_method: 'credit_card',
      status: 'confirmed',
      created_at: '2025-07-01T09:00:00Z',
      updated_at: '2025-07-01T09:00:00Z'
    },
    {
      id: 2,
      user_id: 2,
      event_hall_id: 2,
      coupons_id: null,
      event_type: 'funeral',
      reservation_date: '2025-10-20',
      reservation_time: '15:00',
      guests: 150,
      price: 3500,
      final_price: 3500,
      discount_applied: false,
      payment_method: 'cash',
      status: 'confirmed',
      created_at: '2025-07-05T11:30:00Z',
      updated_at: '2025-07-05T11:30:00Z'
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
  getEventHallsList() {
    return this.successResponse(this.eventHalls);
  }
  
  createEventHall(data: CreateEventHallRequest): Observable<CreateEventHallResponse> {
    const newEventHall: EventHall = {
      id: this.eventHalls.length + 1,
      category_id: 1, // Default category
      ar_title: data.ar_title,
      en_title: data.en_title,
      image: URL.createObjectURL(data.image as unknown as Blob),
      en_location: data.en_location,
      ar_location: data.ar_location,
      capicity: data.capicity,
      price: data.price,
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.eventHalls = [...this.eventHalls, newEventHall];
    
    return this.successResponse<CreateEventHallResponse>({
      success: true,
      event_hall: newEventHall
    });
  }

  deleteEventHall(data: DeleteEventHallRequest): Observable<DeleteEventHallResponse> {
    const eventHallIndex = this.eventHalls.findIndex(h => h.id === data.event_hall_id);
    
    if (eventHallIndex === -1) {
      return this.errorResponse('Event hall not found');
    }

    this.eventHalls = this.eventHalls.filter(h => h.id !== data.event_hall_id);
    
    return this.successResponse<DeleteEventHallResponse>({
      success: true,
      message: 'Event hall deleted successfully'
    });
  }

  getReservations(data: GetEventHallReservationsRequest): Observable<GetEventHallReservationsResponse> {
    const eventHallReservations = this.reservations.filter(
      r => r.event_hall_id === data.event_hall_id
    );
    
    return this.successResponse<GetEventHallReservationsResponse>({
      message: 'Reservations retrieved successfully',
      reservations: eventHallReservations
    });
  }

  closeEventHall(data: CloseEventHallRequest): Observable<CloseEventHallResponse> {
    const eventHall = this.eventHalls.find(h => h.id === data.event_hall_id);
    
    if (!eventHall) {
      return this.errorResponse('Event hall not found');
    }

    eventHall.is_closed = true;
    eventHall.closed_from = data.closed_from;
    eventHall.closed_until = data.closed_until;
    eventHall.updated_at = new Date().toISOString();
    
    return this.successResponse<CloseEventHallResponse>({
      message: 'Event hall closed successfully'
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
