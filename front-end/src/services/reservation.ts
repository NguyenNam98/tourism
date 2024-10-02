import { get, post, put, ServicePrefix } from "./baseApiService";

interface CreateReservationDto {
  tableSize: number;
  reservationTime: string;
}

interface Reservation {
  id: string;
  restaurantId: string;
  tableSize: number;
  reservationTime: string;
  status: string;
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
      `/${ServicePrefix.TableReservation}/reservation/cancel${bookId}`
    );
  },

  getBookedReservations: async (): Promise<{ data: Reservation[] }> => {
    return await get(
      `/${ServicePrefix.TableReservation}/reservation/list/booked`
    );
  },
};
