export interface RejectReservationRequest {
  reservation_id: number;
}

export interface RejectReservationResponse {
  success: boolean;
  message: string;
  reservation_id: number;
  new_status: string;
}