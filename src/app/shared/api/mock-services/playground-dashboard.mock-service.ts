import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  PlayGround,
  PlayGroundReservation,
  CreatePlayGroundRequest,
  CreatePlayGroundResponse,
  DeletePlayGroundRequest,
  DeletePlayGroundResponse,
  GetPlayGroundReservationsRequest,
  GetPlayGroundReservationsResponse,
  ClosePlayGroundRequest,
  ClosePlayGroundResponse
} from '../types/playground-dashboard';
import {
  RejectReservationRequest,
  RejectReservationResponse
} from '../types/reservation';

@Injectable({
  providedIn: 'root'
})
export class MockPlaygroundDashboardService {
  // Mock data
  private playgrounds: PlayGround[] = [
    {
      id: 1,
      category_id: 1,
      sport: 'Football',
      ar_title: 'ملعب كرة القدم الأولمبي',
      en_title: 'Olympic Football Field',
      image: 'assets/images/playgrounds/football-1.jpg',
      en_location: 'Sports City, Riyadh',
      ar_location: 'مدينة الرياض، الرياض',
      price: 200,
      capicity: 22,
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: '2025-01-15T10:00:00Z',
      updated_at: '2025-01-15T10:00:00Z'
    },
    {
      id: 2,
      category_id: 2,
      sport: 'Basketball',
      ar_title: 'ملعب كرة السلة المغطى',
      en_title: 'Indoor Basketball Court',
      image: 'assets/images/playgrounds/basketball-1.jpg',
      en_location: 'Al-Malaz District, Riyadh',
      ar_location: 'حي الملز، الرياض',
      price: 150,
      capicity: 12,
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: '2025-02-20T11:30:00Z',
      updated_at: '2025-02-20T11:30:00Z'
    },
    {
      id: 3,
      category_id: 3,
      sport: 'Tennis',
      ar_title: 'ملعب التنس الفاخر',
      en_title: 'Luxury Tennis Court',
      image: 'assets/images/playgrounds/tennis-1.jpg',
      en_location: 'Al-Olaya, Riyadh',
      ar_location: 'العليا، الرياض',
      price: 180,
      capicity: 4,
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: '2025-03-10T09:15:00Z',
      updated_at: '2025-03-10T09:15:00Z'
    }
  ];

  private reservations: PlayGroundReservation[] = [
    {
      id: 1,
      user_id: 1,
      play_ground_id: 1,
      coupons_id: null,
      reservation_date: '2025-08-20',
      reservation_time: '18:00',
      payment_method: 'credit_card',
      price: 200,
      final_price: 180,
      status: 'confirmed',
      discount_applied: true,
      created_at: '2025-07-10T14:30:00Z',
      updated_at: '2025-07-10T14:30:00Z'
    },
    {
      id: 2,
      user_id: 2,
      play_ground_id: 2,
      coupons_id: null,
      reservation_date: '2025-08-21',
      reservation_time: '20:00',
      payment_method: 'cash',
      price: 150,
      final_price: 150,
      status: 'confirmed',
      discount_applied: false,
      created_at: '2025-07-12T10:15:00Z',
      updated_at: '2025-07-12T10:15:00Z'
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
  getPlaygroundsList() {
    return this.successResponse(this.playgrounds);
  }
  
  createPlayground(data: CreatePlayGroundRequest): Observable<CreatePlayGroundResponse> {
    const newPlayground: PlayGround = {
      id: this.playgrounds.length + 1,
      category_id: 1, // Default category
      sport: data.sport,
      ar_title: data.ar_title,
      en_title: data.en_title,
      image: URL.createObjectURL(data.image as unknown as Blob),
      en_location: data.en_location,
      ar_location: data.ar_location,
      price: data.price,
      capicity: data.capicity,
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.playgrounds = [...this.playgrounds, newPlayground];
    
    return this.successResponse<CreatePlayGroundResponse>({
      success: true,
      playground: newPlayground
    });
  }

  deletePlayground(data: DeletePlayGroundRequest): Observable<DeletePlayGroundResponse> {
    const playgroundIndex = this.playgrounds.findIndex(p => p.id === data.play_ground_id);
    
    if (playgroundIndex === -1) {
      return this.errorResponse('Playground not found');
    }

    this.playgrounds = this.playgrounds.filter(p => p.id !== data.play_ground_id);
    
    return this.successResponse<DeletePlayGroundResponse>({
      message: 'Playground deleted successfully'
    });
  }

  getReservations(data: GetPlayGroundReservationsRequest): Observable<GetPlayGroundReservationsResponse> {
    const playgroundReservations = this.reservations.filter(
      r => r.play_ground_id === data.play_ground_id
    );
    
    return this.successResponse<GetPlayGroundReservationsResponse>({
      message: 'Reservations retrieved successfully',
      reservations: playgroundReservations
    });
  }

  closePlayground(data: ClosePlayGroundRequest): Observable<ClosePlayGroundResponse> {
    const playground = this.playgrounds.find(p => p.id === data.play_ground_id);
    
    if (!playground) {
      return this.errorResponse('Playground not found');
    }

    playground.is_closed = true;
    playground.closed_from = data.closed_from;
    playground.closed_until = data.closed_until;
    playground.updated_at = new Date().toISOString();
    
    return this.successResponse<ClosePlayGroundResponse>({
      message: 'Playground closed successfully'
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
