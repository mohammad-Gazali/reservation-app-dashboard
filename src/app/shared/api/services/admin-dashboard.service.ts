import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CreateCouponRequest,
  CreateCouponResponse,
  GetBlockedUsersResponse,
  GetCouponsResponse,
  GetUserReservationsRequest,
  GetUserReservationsResponse,
  GetUsersResponse,
  UnblockUserRequest,
  UnblockUserResponse
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private http = inject(HttpClient);
  private apiPrefix = '/api/admin-dashboard';

  getUsers() {
    return this.http.get<GetUsersResponse>(`${this.apiPrefix}/users`);
  }

  getBlockedUsers() {
    return this.http.get<GetBlockedUsersResponse>(`${this.apiPrefix}/blocked-users`);
  }

  unblockUser(data: UnblockUserRequest) {
    return this.http.post<UnblockUserResponse>(`${this.apiPrefix}/unblock`, data);
  }

  getCoupons() {
    return this.http.get<GetCouponsResponse>(`${this.apiPrefix}/coupons`);
  }

  createCoupon(data: CreateCouponRequest) {
    return this.http.post<CreateCouponResponse>(`${this.apiPrefix}/create-coupon`, data);
  }

  getUserReservations(data: GetUserReservationsRequest) {
    return this.http.post<GetUserReservationsResponse>(`${this.apiPrefix}/user-reservations`, data);
  }
}