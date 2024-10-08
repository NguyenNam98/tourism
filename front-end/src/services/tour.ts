import { get, post, ServicePrefix } from "./baseApiService";

interface CreateTourDto {
  title: string;
  description: string;
  location: string;
  price: number;
  maxParticipant: number;
  image: string;
}

interface CreateTourServicesDto {
  title: string;
  description: string;
  location: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  maxParticipant: number;
  image: string;
  rating: number;
}

interface TourServices {
  id: string;
  title: string;
  description: string;
  location: string;
}

export interface BookingTour {
  id: string;
  userId: string;
  tourId: string;

  date: string;
  name: string;
  mobile: string;
  maxParticipants: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export const TourBookingService = {
  createTour: async (tourData: CreateTourDto): Promise<{ data: string }> => {
    return await post(`/${ServicePrefix.TourBooking}/tour/create`, tourData);
  },

  getListTour: async (): Promise<{ data: Tour[] }> => {
    return await get(`/${ServicePrefix.TourBooking}/tour/list`);
  },

  getDetailTour: async (tourId: string): Promise<{ data: Tour }> => {
    return await get(`/${ServicePrefix.TourBooking}/tour/${tourId}`);
  },

  createTourService: async (
    tourId: string,
    serviceData: CreateTourServicesDto
  ): Promise<{ data: string }> => {
    return await post(
      `/${ServicePrefix.TourBooking}/tour/service/${tourId}`,
      serviceData
    );
  },

  getTourServices: async (
    tourId: string
  ): Promise<{ data: TourServices[] }> => {
    return await get(`/${ServicePrefix.TourBooking}/tour/service/${tourId}`);
  },

  getBookedTours: async (): Promise<{
    data: BookingTour[];
  }> => {
    return await get(`/${ServicePrefix.TourBooking}/tour/book/list`);
  },

  bookTour: async (
    data: Omit<BookingTour, "id">
  ): Promise<{ data: string }> => {
    return await post(`/${ServicePrefix.TourBooking}/tour/book`, data);
  },
};
