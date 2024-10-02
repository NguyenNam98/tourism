import { get, post, ServicePrefix } from "./baseApiService";

interface CreateTourDto {
  name: string;
  description: string;
  location?: string;
}

interface CreateTourServicesDto {
  serviceName: string;
  serviceDescription: string;
  additionalDetails?: string;
}

interface Tour {
  id: string;
  name: string;
  description: string;
  location?: string;
}

interface TourServices {
  id: string;
  serviceName: string;
  serviceDescription: string;
  additionalDetails?: string;
}

interface BookingTour {
  id: string;
  userId: string;
  tour: Tour;
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
    data: { tours: Tour[]; bookingTours: BookingTour[] };
  }> => {
    return await get(`/${ServicePrefix.TourBooking}/tour/book/list`);
  },

  bookTour: async (tourId: string): Promise<{ data: string }> => {
    return await get(`/${ServicePrefix.TourBooking}/tour/book/${tourId}`);
  },
};
