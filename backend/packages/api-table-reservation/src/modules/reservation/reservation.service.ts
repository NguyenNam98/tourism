import { Injectable } from '@nestjs/common'
import {DataSource, In, LessThanOrEqual, MoreThanOrEqual} from 'typeorm'
import {DatabaseModule} from "../../database.module";
import {DATABASE_NAMES} from "../../app.constant";
import {InjectDataSource} from "@nestjs/typeorm";
import {CreateReservationDto, CreateRestaurantDto} from "./reservation.dto";
import {Restaurant} from "../../entities/table_reservation/restaurant.enty";
import {BusinessException} from "../../app.exception";
import {Reservation} from "../../entities/table_reservation/reservation.entity";

@Injectable()
export class ReservationService {
  constructor(
      @InjectDataSource(DatabaseModule.getConnectionName(DATABASE_NAMES.POSTGRES))
      private masterConnection: DataSource,
  ) {}

  async bookATable(
      restaurantId: string,
      data: CreateReservationDto,
      userId: string
  ): Promise<string> {
    const restaurant = await this.masterConnection.getRepository(Restaurant).findOne({
      where: {
        id: restaurantId
      }
    })
    if (!restaurant) {
      throw new BusinessException('Restaurant not found')
    }
   const reservationByTableId = await this.masterConnection.getRepository(Reservation).findOne({
    where: {
      tableId: data.tableId,
      status: 1,// 1: reserved
      startAt: LessThanOrEqual(data.endAt),
      endAt: MoreThanOrEqual(data.startAt),
      restaurantId
    }
   })
    if (reservationByTableId) {
      throw new BusinessException('Table has been reserved')
    }
    const p = await this.masterConnection
        .getRepository(Reservation)
        .insert({
          tableId: data.tableId,
          startAt: data.startAt,
          endAt: data.endAt,
          status: 1,
          restaurantId,
          userId
        })
    return p.identifiers[0].id
  }

  async CancelBookTable(id: string) {
    return await this.masterConnection
        .getRepository(Reservation)
        .update({id},
            {status: 3})

  }

  async getListBooked(
      userId: string,
  ): Promise<Reservation[]> {
    return await this.masterConnection
        .getRepository(Reservation)
        .find({
          where: {
            userId: userId
          }})
  }
}
