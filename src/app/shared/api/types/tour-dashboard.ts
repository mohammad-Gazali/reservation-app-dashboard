import { User } from "./admin-dashboard";

export interface Tour {
  id: number;
  category_id: number;
  ar_title: string;
  en_title: string;
  ar_description: string;
  en_description: string;
  image: string;
  price: number;
  start_date: string; // ISO date
  end_date: string; // ISO date
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
}

export interface TourStop {
  id: number;
  tour_id: number;
  sequence: number;
  ar_title: string;
  en_title: string;
  image: string;
  ar_description: string;
  en_description: string;
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
}

export interface ToursReservation {
  id: number;
  user_id: number;
  tour_id: number;
  coupons_id: number | null;
  guests: number;
  price: number;
  final_price: number | null;
  payment_method: string;
  status: 'confirmed' | 'rejected' | 'cancelled' | 'done';
  start_date: string; // ISO date
  end_date: string; // ISO date
  discount_applied: boolean;
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
  user?: User; // Optional if populated
}

// Create Tour
export interface CreateTourRequest {
  ar_title: string;
  en_title: string;
  ar_description: string;
  en_description: string;
  image: File;
  price: number;
  start_date: string; // ISO date
  end_date: string; // ISO date
}

export interface CreateTourResponse {
  message: string;
  tour: Tour;
}

// Delete Tour
export interface DeleteTourRequest {
  tour_id: number;
}

export interface DeleteTourResponse {
  message: string;
}

// Get Reservations
export interface GetTourReservationsRequest {
  tour_id: number;
}

export interface GetTourReservationsResponse {
  message: string;
  reservations: ToursReservation[];
}

export interface CreateTourStopRequest {
  tour_id: number;
  ar_title: string;
  en_title: string;
  ar_description: string;
  en_description: string;
  image: File;
}

export interface CreateTourStopResponse {
  message: string;
  stop: TourStop;
}

export interface DeleteTourStopRequest {
  tour_stop_id: number;
}

export interface DeleteTourStopResponse {
  message: string;
}