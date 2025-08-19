import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  Hotel, 
  HotelRoom, 
  HotelReservation,
  CreateHotelRequest,
  CreateHotelResponse,
  DeleteHotelRequest,
  DeleteHotelResponse,
  CloseHotelRequest,
  CloseHotelResponse,
  CreateHotelRoomRequest,
  CreateHotelRoomResponse,
  DeleteHotelRoomRequest,
  DeleteHotelRoomResponse
} from '../types/hotel-dashboard';
import { 
  RejectReservationRequest, 
  RejectReservationResponse 
} from '../types/reservation';

@Injectable({
  providedIn: 'root'
})
export class MockHotelDashboardService {
  // Mock data
  private hotels: Hotel[] = [
    {
      id: 1,
      category_id: 1,
      ar_title: 'فندق الرياض الفاخر',
      en_title: 'Riyadh Luxury Hotel',
      image: 'assets/images/hotels/hotel-1.jpg',
      en_location: 'King Fahd Road, Riyadh',
      ar_location: 'طريق الملك فهد، الرياض',
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: '2025-01-15T10:00:00Z',
      updated_at: '2025-01-15T10:00:00Z'
    },
    {
      id: 2,
      category_id: 2,
      ar_title: 'شقق جدة الساحلية',
      en_title: 'Jeddah Beach Residences',
      image: 'assets/images/hotels/hotel-2.jpg',
      en_location: 'Corniche Road, Jeddah',
      ar_location: 'الكورنيش، جدة',
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: '2025-02-20T11:30:00Z',
      updated_at: '2025-02-20T11:30:00Z'
    }
  ];

  private rooms: HotelRoom[] = [
    {
      id: 1,
      hotel_id: 1,
      floor: 5,
      room_number: 501,
      type: 'Deluxe',
      capacity: 2,
      price_per_night: 500,
      description: 'Spacious deluxe room with city view',
      created_at: '2025-01-15T10:00:00Z',
      updated_at: '2025-01-15T10:00:00Z'
    },
    {
      id: 2,
      hotel_id: 1,
      floor: 5,
      room_number: 502,
      type: 'Suite',
      capacity: 4,
      price_per_night: 800,
      description: 'Luxury suite with living area and jacuzzi',
      created_at: '2025-01-15T10:00:00Z',
      updated_at: '2025-01-15T10:00:00Z'
    }
  ];

  private reservations: HotelReservation[] = [
    {
      id: 1,
      user_id: 1,
      hotel_id: 1,
      hotel_room_id: 1,
      coupons_id: null,
      start_date: '2025-08-15',
      nights: 3,
      payment_method: 'credit_card',
      price: 1500,
      final_price: 1425,
      status: 'confirmed',
      created_at: '2025-07-01T09:00:00Z',
      updated_at: '2025-07-01T09:00:00Z'
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
  getHotelsList() {
    return this.successResponse(this.hotels);
  }
  
  createHotel(data: CreateHotelRequest): Observable<CreateHotelResponse> {
    const newHotel: Hotel = {
      id: this.hotels.length + 1,
      category_id: 1, // Default category
      ar_title: data.ar_title,
      en_title: data.en_title,
      image: URL.createObjectURL(data.image as unknown as Blob),
      en_location: data.en_location,
      ar_location: data.ar_location,
      is_closed: false,
      closed_from: null,
      closed_until: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.hotels = [...this.hotels, newHotel];
    
    return this.successResponse<CreateHotelResponse>({
      message: 'Hotel created successfully',
      hotel: newHotel
    });
  }

  deleteHotel(data: DeleteHotelRequest): Observable<DeleteHotelResponse> {
    const hotelIndex = this.hotels.findIndex(h => h.id === data.hotel_id);
    
    if (hotelIndex === -1) {
      return this.errorResponse('Hotel not found');
    }

    this.hotels = this.hotels.filter(h => h.id !== data.hotel_id);
    
    return this.successResponse<DeleteHotelResponse>({
      message: 'Hotel deleted successfully',
      hotel_id: data.hotel_id
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

  closeHotel(data: CloseHotelRequest): Observable<CloseHotelResponse> {
    const hotel = this.hotels.find(h => h.id === data.hotel_id);
    
    if (!hotel) {
      return this.errorResponse('Hotel not found');
    }

    hotel.is_closed = true;
    hotel.closed_from = data.closed_from;
    hotel.closed_until = data.closed_until;
    hotel.updated_at = new Date().toISOString();
    
    return this.successResponse<CloseHotelResponse>({
      message: 'Hotel closed successfully',
      hotel: hotel
    });
  }

  getReservations(data: { hotel_id?: number; status?: string; page?: number; per_page?: number } = {}): Observable<{ reservations: HotelReservation[]; total: number; current_page: number; last_page: number; per_page: number }> {
    let filteredReservations = [...this.reservations];
    
    if (data.hotel_id !== undefined) {
      filteredReservations = filteredReservations.filter(r => r.hotel_id === data.hotel_id);
    }
    
    if (data.status) {
      filteredReservations = filteredReservations.filter(r => r.status === data.status);
    }
    
    const page = data.page || 1;
    const perPage = data.per_page || 10;
    const startIndex = (page - 1) * perPage;
    const paginatedReservations = filteredReservations.slice(startIndex, startIndex + perPage);
    
    return this.successResponse({
      reservations: paginatedReservations,
      total: filteredReservations.length,
      current_page: page,
      last_page: Math.ceil(filteredReservations.length / perPage),
      per_page: perPage
    });
  }

  createHotelRoom(data: CreateHotelRoomRequest): Observable<CreateHotelRoomResponse> {
    const newRoom: HotelRoom = {
      id: this.rooms.length + 1,
      hotel_id: data.hotel_id,
      floor: data.floor,
      room_number: data.room_number,
      type: data.type,
      capacity: data.capacity,
      price_per_night: data.price_per_night,
      description: data.description || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.rooms = [...this.rooms, newRoom];
    
    return this.successResponse<CreateHotelRoomResponse>({
      message: 'Room created successfully',
      room: newRoom
    });
  }

  deleteHotelRoom(data: DeleteHotelRoomRequest): Observable<DeleteHotelRoomResponse> {
    const roomIndex = this.rooms.findIndex(r => r.id === data.room_id);
    
    if (roomIndex === -1) {
      return this.errorResponse('Room not found');
    }

    this.rooms = this.rooms.filter(r => r.id !== data.room_id);
    
    return this.successResponse<DeleteHotelRoomResponse>({
      message: 'Room deleted successfully'
    });
  }
}