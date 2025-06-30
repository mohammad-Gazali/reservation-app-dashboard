import { User } from "./admin-dashboard";

export interface Hotel {
  id: number;
  category_id: number;
  ar_title: string;
  en_title: string;
  image: string;
  en_location: string;
  ar_location: string;
  is_closed: boolean;
  closed_from: string | null; // ISO date
  closed_until: string | null; // ISO date
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
}

export interface HotelRoom {
  id: number;
  hotel_id: number;
  floor: number;
  room_number: number;
  type: string;
  capacity: number;
  price_per_night: number;
  description: string;
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
}

export interface HotelReservation {
  id: number;
  user_id: number;
  hotel_id: number;
  hotel_room_id: number;
  coupons_id: number | null;
  start_date: string; // ISO date
  nights: number;
  payment_method: 'cash' | 'credit_card' | 'paypal';
  price: number;
  final_price: number | null;
  status: 'confirmed' | 'rejected' | 'cancelled' | 'done' | 'missed';
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
  user?: User; // Optional if populated
}

// Create Hotel
export interface CreateHotelRequest {
  ar_title: string;
  en_title: string;
  image: File;
  en_location: string;
  ar_location: string;
}

export interface CreateHotelResponse {
  message: string;
  hotel: Hotel;
}

// Delete Hotel
export interface DeleteHotelRequest {
  hotel_id: number;
}

export interface DeleteHotelResponse {
  message: string;
  hotel_id: number;
}

// Close Hotel
export interface CloseHotelRequest {
  hotel_id: number;
  closed_from: string; // ISO date
  closed_until: string; // ISO date
}

export interface CloseHotelResponse {
  message: string;
  hotel: Hotel;
}

// Create/Delete Room
export interface CreateHotelRoomRequest {
  hotel_id: number;
  floor: number;
  room_number: number;
  type: string;
  capacity: number;
  price_per_night: number;
  description?: string;
}

export interface CreateHotelRoomResponse {
  message: string;
  room: HotelRoom;
}

export interface DeleteHotelRoomRequest {
  room_id: number;
}

export interface DeleteHotelRoomResponse {
  message: string;
}