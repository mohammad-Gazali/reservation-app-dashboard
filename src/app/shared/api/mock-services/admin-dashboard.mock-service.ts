import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  User,
  Coupon,
  GetUsersResponse,
  GetBlockedUsersResponse,
  UnblockUserRequest,
  UnblockUserResponse,
  GetCouponsResponse,
  CreateCouponRequest,
  CreateCouponResponse,
  GetUserReservationsRequest,
  GetUserReservationsResponse,
  ReservationData
} from '../types/admin-dashboard';

@Injectable({
  providedIn: 'root'
})
export class MockAdminDashboardService {
  // Mock data
  private users: User[] = [
    {
      id: 1,
      first_name: 'أحمد',
      last_name: 'محمد',
      avatar: 'assets/images/avatars/user1.jpg',
      username: 'ahmedmohamed',
      email: 'ahmed@example.com',
      is_blocked: false,
      blocked_until: null,
      remember_token: null,
      created_at: '2025-01-10T10:00:00Z',
      updated_at: '2025-01-10T10:00:00Z'
    },
    {
      id: 2,
      first_name: 'سارة',
      last_name: 'علي',
      avatar: 'assets/images/avatars/user2.jpg',
      username: 'saraali',
      email: 'sara@example.com',
      is_blocked: true,
      blocked_until: '2025-08-31T23:59:59Z',
      remember_token: null,
      created_at: '2025-02-15T11:30:00Z',
      updated_at: '2025-07-01T14:30:00Z'
    },
    {
      id: 3,
      first_name: 'محمد',
      last_name: 'خالد',
      avatar: null,
      username: 'mohkhalid',
      email: 'mohamed@example.com',
      is_blocked: false,
      blocked_until: null,
      remember_token: null,
      created_at: '2025-03-20T09:15:00Z',
      updated_at: '2025-03-20T09:15:00Z'
    }
  ];

  private coupons: Coupon[] = [
    {
      id: 1,
      code: 'WELCOME10',
      discount_percentage: 10,
      usage_limit: 100,
      used_count: 42,
      expires_at: '2025-12-31T23:59:59Z',
      is_active: true,
      created_at: '2025-01-01T00:00:00Z',
      updated_at: '2025-07-15T10:30:00Z'
    },
    {
      id: 2,
      code: 'SUMMER25',
      discount_percentage: 25,
      usage_limit: 50,
      used_count: 12,
      expires_at: '2025-08-31T23:59:59Z',
      is_active: true,
      created_at: '2025-05-01T00:00:00Z',
      updated_at: '2025-07-10T15:45:00Z'
    },
    {
      id: 3,
      code: 'VIP50',
      discount_percentage: 50,
      usage_limit: 10,
      used_count: 10,
      expires_at: '2025-12-31T23:59:59Z',
      is_active: false,
      created_at: '2025-01-15T00:00:00Z',
      updated_at: '2025-06-30T18:20:00Z'
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

  // User Management
  getUsers(): Observable<GetUsersResponse> {
    return this.successResponse<GetUsersResponse>({
      success: true,
      users: this.users
    });
  }

  getBlockedUsers(): Observable<GetBlockedUsersResponse> {
    const blockedUsers = this.users.filter(user => user.is_blocked);
    
    return this.successResponse<GetBlockedUsersResponse>({
      success: true,
      blocked_users: blockedUsers
    });
  }

  unblockUser(data: UnblockUserRequest): Observable<UnblockUserResponse> {
    const userIndex = this.users.findIndex(user => user.email === data.email);
    
    if (userIndex === -1) {
      return this.errorResponse('User not found');
    }

    this.users[userIndex].is_blocked = false;
    this.users[userIndex].blocked_until = null;
    this.users[userIndex].updated_at = new Date().toISOString();
    
    return this.successResponse<UnblockUserResponse>({
      message: 'User unblocked successfully'
    });
  }

  // Coupon Management
  getCoupons(): Observable<GetCouponsResponse> {
    return this.successResponse<GetCouponsResponse>({
      status: 'success',
      coupons: this.coupons
    });
  }

  createCoupon(data: CreateCouponRequest): Observable<CreateCouponResponse> {
    const newCoupon: Coupon = {
      id: this.coupons.length + 1,
      code: data.code,
      discount_percentage: data.discount_percentage,
      usage_limit: data.usage_limit || 100,
      used_count: 0,
      expires_at: data.expires_at || null,
      is_active: data.is_active !== undefined ? data.is_active : true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.coupons = [...this.coupons, newCoupon];
    
    return this.successResponse<CreateCouponResponse>({
      message: 'Coupon created successfully',
      coupon: newCoupon
    });
  }

  // User Reservations
  getUserReservations(data: GetUserReservationsRequest): Observable<GetUserReservationsResponse> {
    // In a real implementation, this would filter reservations by user_id and type
    // For the mock, we'll return an empty response with the expected structure
    const responseData: ReservationData = {
      restaurant_reservations: [],
      hotel_reservations: [],
      tour_reservations: [],
      play_ground_reservations: [],
      event_hall_reservations: []
    };

    // Set the appropriate array based on the type
    if (data.type) {
      const typeMap: Record<string, keyof ReservationData> = {
        'restaurants': 'restaurant_reservations',
        'hotels': 'hotel_reservations',
        'tours': 'tour_reservations',
        'playgrounds': 'play_ground_reservations',
        'event_halls': 'event_hall_reservations'
      };
      
      // Add some mock data for the requested type
      const reservationKey = typeMap[data.type];
      if (reservationKey) {
        (responseData[reservationKey] as any[]) = [
          {
            id: 1,
            user_id: data.user_id,
            status: 'confirmed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
            // Other reservation fields would be added here
          }
        ];
      }
    }

    return this.successResponse<GetUserReservationsResponse>({
      status: 'success',
      data: responseData
    });
  }
}
