import { Injectable } from "@nestjs/common";
import { DataSource, In, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { DatabaseModule } from "../../database.module";
import { DATABASE_NAMES } from "../../app.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateReservationDto, CreateRestaurantDto } from "./reservation.dto";
import { Restaurant } from "../../entities/table_reservation/restaurant.enty";
import { BusinessException } from "../../app.exception";
import { Reservation } from "../../entities/table_reservation/reservation.entity";

@Injectable()
export class ReservationService {
  constructor(
    @InjectDataSource(DatabaseModule.getConnectionName(DATABASE_NAMES.POSTGRES))
    private masterConnection: DataSource
  ) {}

  async bookATable(
    data: CreateReservationDto,
    userId: string
  ): Promise<string> {
    const restaurant = await this.masterConnection
      .getRepository(Restaurant)
      .findOne({
        where: {
          id: data.restaurantId,
        },
      });
    if (!restaurant) {
      throw new BusinessException("Restaurant not found");
    }
    const reservation = await this.masterConnection
      .getRepository(Reservation)
      .findOne({
        where: {
          status: 1, // 1: reserved
          userId,
          ...data,
        },
      });

    return reservation.id;
  }

  async CancelBookTable(id: string) {
    return await this.masterConnection
      .getRepository(Reservation)
      .update({ id }, { status: 3 });
  }

  async getListBooked(userId: string): Promise<Reservation[]> {
    return await this.masterConnection.getRepository(Reservation).find({
      where: {
        userId: userId,
      },
    });
  }
}
