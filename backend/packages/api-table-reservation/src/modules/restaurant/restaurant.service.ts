import { Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import { DatabaseModule } from "../../database.module";
import { DATABASE_NAMES } from "../../app.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import {
  CreateRestaurantDto,
  CreateRestaurantTableDto,
} from "./restaurant.dto";
import { Restaurant } from "../../entities/table_reservation/restaurant.enty";
import { BusinessException } from "../../app.exception";
import { RestaurantTable } from "../../entities/table_reservation/table.entity";

@Injectable()
export class RestaurantService {
  constructor(
    @InjectDataSource(DatabaseModule.getConnectionName(DATABASE_NAMES.POSTGRES))
    private masterConnection: DataSource
  ) {}

  async createRestaurant(data: CreateRestaurantDto): Promise<string> {
    const p = await this.masterConnection.getRepository(Restaurant).insert({
      name: data.name,
      description: data.description,
      location: data.location,
    });
    return p.identifiers[0].id;
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    const restaurant = await this.masterConnection
      .getRepository(Restaurant)
      .findOne({ where: { id } });
    if (!restaurant) {
      throw new BusinessException("Restaurant not found");
    }

    return restaurant;
  }

  async getListRestaurant(): Promise<Restaurant[]> {
    return await this.masterConnection.getRepository(Restaurant).find({
      where: {
        isValid: true,
      },
    });
  }

  async getListRestaurantByType(type: string): Promise<Restaurant[]> {
    return await this.masterConnection.getRepository(Restaurant).find({
      where: {
        isValid: true,
        type: type,
      },
    });
  }

  async createTable(
    restaurantId: string,
    table: CreateRestaurantTableDto
  ): Promise<string> {
    const restaurant = await this.masterConnection
      .getRepository(Restaurant)
      .findOne({
        where: {
          id: restaurantId,
        },
      });
    if (!restaurant) {
      throw new BusinessException("Restaurant not found");
    }
    const p = await this.masterConnection
      .getRepository(RestaurantTable)
      .insert(table);
    return p.identifiers[0].id;
  }
  async getTableDetail(id: string): Promise<RestaurantTable> {
    return await this.masterConnection.getRepository(RestaurantTable).findOne({
      where: {
        id,
      },
    });
  }
}
