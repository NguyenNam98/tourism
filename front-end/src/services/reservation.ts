import { get, post, put, ServicePrefix } from "./baseApiService";
interface CreateReservationDto {
  tableId: string;
  userId: string;
  startAt: string;
  endAt: string;
  note: string;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  tableId: string;
  userId: string;
  startAt: string;
  endAt: string;
  note: string;
  status: number;
}

export const ReservationService = {
  bookTable: async (
    restaurantId: string,
    reservationData: CreateReservationDto
  ): Promise<{ data: string }> => {
    return await post(
      `/${ServicePrefix.TableReservation}/reservation/${restaurantId}`,
      reservationData
    );
  },

  cancelReservation: async (bookId: string): Promise<void> => {
    return await put(
      `/${ServicePrefix.TableReservation}/reservation/cancel/${bookId}`
    );
  },

  getBookedReservations: async (): Promise<{ data: Reservation[] }> => {
    return await get(
      `/${ServicePrefix.TableReservation}/reservation/list/booked`
    );
  },
};
