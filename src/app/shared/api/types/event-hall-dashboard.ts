// src/app/models/event-hall.model.ts

import { User } from "./admin-dashboard";

export interface EventHall {
  id: number;
  category_id: number;
  ar_title: string;
  en_title: string;
  image: string;
  en_location: string;
  ar_location: string;
  capicity: number;
  price: number;
  is_closed: boolean;
  closed_from: string | null; // ISO date
  closed_until: string | null; // ISO date
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
}

export interface EventHallReservation {
  id: number;
  user_id: number;
  event_hall_id: number;
  coupons_id: number | null;
  event_type: 'wedding' | 'funeral';
  reservation_date: string; // ISO date
  reservation_time: string;
  guests: number;
  price: number;
  final_price: number | null;
  discount_applied: boolean;
  payment_method: 'cash' | 'credit_card' | 'MTN_CASH';
  status: 'confirmed' | 'cancelled' | 'done' | 'rejected' | 'missed';
  created_at?: string; // ISO date
  updated_at?: string; // ISO date
  user?: User; // Optional if populated
}

export interface CreateEventHallRequest {
  ar_title: string;
  en_title: string;
  image: File;
  en_location: string;
  ar_location: string;
  capicity: number;
  price: number;
}

export interface CreateEventHallResponse {
  success: boolean;
  event_hall: EventHall;
}

export interface DeleteEventHallRequest {
  event_hall_id: number;
}

export interface DeleteEventHallResponse {
  success: boolean;
  message: string;
}

export interface GetEventHallReservationsRequest {
  event_hall_id: number;
}

export interface GetEventHallReservationsResponse {
  message: string;
  reservations: EventHallReservation[];
}

export interface CloseEventHallRequest {
  event_hall_id: number;
  closed_from: string; // ISO date
  closed_until: string; // ISO date
}

export interface CloseEventHallResponse {
  message: string;
}