import { get, post, put, ServicePrefix } from "./baseApiService";

export interface Reservation {
  id: string;
  userId: string;
  restaurantId: string;
  date: Date;
  name: string;
  mobile: string;
  noPersons: number;
  note: string;
}

export const ReservationService = {
  bookTable: async (
    reservationData: Partial<Reservation>
  ): Promise<{ data: string; error: string; message: string }> => {
    console.log(reservationData);
    return await post(
      `/${ServicePrefix.TableReservation}/reservation/${reservationData.restaurantId}`,
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
