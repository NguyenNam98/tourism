import { Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import { BusinessException } from "app.exception";
import { DatabaseModule } from "../../database.module";
import { DATABASE_NAMES } from "../../app.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { Tour } from "../../entities/tour/tour.entity";
import { BookingTour } from "../../entities/tour/booking_tour.entity";
import {
  CreateBookingDto,
  CreateTourDto,
  CreateTourServicesDto,
} from "./book-tour.dto";
import { TourServices } from "../../entities/tour/tour_services.entity";

@Injectable()
export class BookTourService {
  constructor(
    @InjectDataSource(DatabaseModule.getConnectionName(DATABASE_NAMES.POSTGRES))
    private masterConnection: DataSource
  ) {}

  async createTour(data: CreateTourDto): Promise<string> {
    const p = await this.masterConnection.getRepository(Tour).insert({
      title: data.title,
      description: data.description,
      location: data.location,
      price: data.price,
      maxParticipant: data.maxParticipant,
    });
    return p.identifiers[0].id;
  }

  async createTourService(
    tourId: string,
    data: CreateTourServicesDto
  ): Promise<string> {
    const tour = await this.masterConnection.getRepository(Tour).findOne({
      where: {
        id: tourId,
      },
    });
    if (!tour) {
      throw new BusinessException("Tour not found");
    }
    const p = await this.masterConnection.getRepository(TourServices).insert({
      title: data.title,
      description: data.description,
      location: data.location,
      tourId,
    });
    return p.identifiers[0].id;
  }

  async getTourServiceByTourId(tourId: string): Promise<TourServices[]> {
    return await this.masterConnection.getRepository(TourServices).find({
      where: {
        tourId: tourId,
      },
    });
  }
  async getTourById(id: string): Promise<Tour> {
    return await this.masterConnection
      .getRepository(Tour)
      .findOne({ where: { id } });
  }

  async getListTour(): Promise<Tour[]> {
    return await this.masterConnection.getRepository(Tour).find({
      where: {
        isValid: true,
      },
    });
  }

  async bookATour(data: CreateBookingDto): Promise<string> {
    const tour = await this.masterConnection.getRepository(Tour).findOne({
      where: {
        isValid: true,
        id: data.tourId,
      },
    });
    if (!tour) {
      throw new BusinessException("Tour not found");
    }
    const bookingId = await this.masterConnection
      .getRepository(BookingTour)
      .insert({
        ...data,
      });
    return bookingId.identifiers[0].id;
  }

  async getBookedTourByUserId(userId: string): Promise<BookingTour[]> {
    const bookingTours = await this.masterConnection
      .getRepository(BookingTour)
      .find({
        where: {
          userId,
        },
      });
    const tourIds = bookingTours.map((tour) => tour.tourId);
    const tours = await this.masterConnection.getRepository(Tour).find({
      where: {
        id: In(tourIds),
      },
    });
    return bookingTours;
  }
}
