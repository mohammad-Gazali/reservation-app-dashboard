import { User } from "./admin-dashboard";

export interface PlayGround {
  id: number;
  category_id: number;
  sport: 'Football' | 'Basketball' | 'Tennis';
  ar_title: string;
  en_title: string;
  image: string;
  en_location: string;
  ar_location: string;
  price: number;
  capicity: number;
  is_closed: boolean;
  closed_from: string | null; // ISO date
  closed_until: string | null; // ISO date
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
}

export interface PlayGroundReservation {
  id: number;
  user_id: number;
  play_ground_id: number;
  coupons_id: number | null;
  reservation_date: string; // ISO date
  reservation_time: string;
  payment_method: 'cash' | 'credit_card' | 'MTN_CASH';
  price: number;
  final_price: number | null;
  status: 'confirmed' | 'cancelled' | 'done' | 'rejected' | 'missed';
  discount_applied: boolean;
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
  user?: User; // Optional if populated
}

export interface CreatePlayGroundRequest {
  sport: 'Football' | 'Basketball' | 'Tennis';
  ar_title: string;
  en_title: string;
  image: File;
  en_location: string;
  ar_location: string;
  price: number;
  capicity: number;
}

export interface CreatePlayGroundResponse {
  success: boolean;
  playground: PlayGround;
}

export interface DeletePlayGroundRequest {
  play_ground_id: number;
}

export interface DeletePlayGroundResponse {
  message: string;
}

export interface GetPlayGroundReservationsRequest {
  play_ground_id: number;
}

export interface GetPlayGroundReservationsResponse {
  message: string;
  reservations: PlayGroundReservation[];
}

export interface ClosePlayGroundRequest {
  play_ground_id: number;
  closed_from: string; // ISO date
  closed_until: string; // ISO date
}

export interface ClosePlayGroundResponse {
  message: string;
}
