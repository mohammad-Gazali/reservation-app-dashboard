// src/app/models/restaurant.model.ts

import { User } from "./admin-dashboard";

export interface Category {
  id: number;
  ar_title: string;
  en_title: string;
  image: string;
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
}

export interface Restaurant {
  id: number;
  category_id: number;
  ar_title: string;
  en_title: string;
  image: string;
  capacity: number;
  ar_location: string;
  en_location: string;
  is_closed: boolean;
  closed_from: string | null; // ISO date
  closed_until: string | null; // ISO date
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
}

export interface RestaurantReservation {
  id: number;
  user_id: number;
  restaurant_id: number;
  reservation_time: string; // ISO date
  area_type: 'indoor_hall' | 'outdoor_terrace' | null;
  guests: number;
  status: 'confirmed' | 'cancelled' | 'missed' | 'rejected';
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
  user?: User; // Optional if you include populated user data
}

export interface CreateRestaurantRequest {
  ar_title: string;
  en_title: string;
  image: File;
  capacity: number;
  ar_location: string;
  en_location: string;
}

export interface CreateRestaurantResponse {
  message: string;
  restaurant: Restaurant;
}

export interface DeleteRestaurantRequest {
  restaurant_id: number;
}

export interface DeleteRestaurantResponse {
  message: string;
}

export interface GetReservationsRequest {
  restaurant_id: number;
}

export interface GetReservationsResponse {
  message: string;
  reservations: RestaurantReservation[];
}

export interface CloseRestaurantRequest {
  restaurant_id: number;
  closed_from: string; // ISO date
  closed_until: string; // ISO date
}

export interface CloseRestaurantResponse {
  message: string;
}
