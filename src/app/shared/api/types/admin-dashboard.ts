// --- USERS ---
export interface GetUsersResponse {
  success: boolean;
  users: User[];
}

export interface GetBlockedUsersResponse {
  success: boolean;
  blocked_users: User[];
}

export interface UnblockUserRequest {
  email: string;
}

export interface UnblockUserResponse {
  message: string;
}

// --- COUPONS ---
export interface GetCouponsResponse {
  status: string;
  coupons: Coupon[];
}

export interface CreateCouponRequest {
  code: string;
  discount_percentage: number;
  usage_limit?: number;
  expires_at?: string; // ISO date string
  is_active?: boolean;
}

export interface CreateCouponResponse {
  message: string;
  coupon: Coupon;
}

// --- RESERVATIONS ---
export interface GetUserReservationsRequest {
  user_id: number;
  type?: 'restaurants' | 'hotels' | 'tours' | 'playgrounds' | 'event_halls';
}

export interface GetUserReservationsResponse {
  status: string;
  data: ReservationData;
}

interface ReservationData {
  restaurant_reservations?: any[];
  hotel_reservations?: any[];
  tour_reservations?: any[];
  play_ground_reservations?: any[];
  event_hall_reservations?: any[];
}

// ---- Models ----
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string | null;
  username: string;
  email: string;
  password?: string;
  fingerprint?: string;
  is_blocked: boolean;
  blocked_until: string | null; // ISO date string
  remember_token: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface Coupon {
  id: number;
  code: string;
  discount_percentage: number;
  usage_limit: number;
  used_count: number;
  expires_at: string | null; // ISO date string
  is_active: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}