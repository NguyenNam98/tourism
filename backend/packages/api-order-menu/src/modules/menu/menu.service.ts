import { Injectable } from '@nestjs/common'
import {DataSource} from 'typeorm'
import {DatabaseModule} from "../../database.module";
import {DATABASE_NAMES} from "../../app.constant";
import {InjectDataSource} from "@nestjs/typeorm";
import {CreateMenuItemDto} from "./menu.dto";
import {MenuItem} from "../../entities/order/menu_item.entity";

@Injectable()
export class MenuService {
  constructor(
      @InjectDataSource(DatabaseModule.getConnectionName(DATABASE_NAMES.POSTGRES))
      private masterConnection: DataSource,
  ) {}

  async createMenuItem(
      restaurantId: string,
      data: CreateMenuItemDto,
  ): Promise<string> {
    const p = await this.masterConnection
      .getRepository(MenuItem)
      .insert({
        title: data.title,
        description: data.description,
        price: data.price,
        restaurantId
      })
    return p.identifiers[0].id
  }


  async getMenuByRestaurantId(
      restaurantId: string,
  ): Promise<MenuItem[]> {
    return await this.masterConnection
        .getRepository(MenuItem)
        .find({
          where: {
            isValid: true,
            restaurantId
          }}
        )

  }

  async getMenuItemById(
      id: string,
  ): Promise<MenuItem> {
    return await this.masterConnection
        .getRepository(MenuItem)
        .findOne({where: {id}})
  }

}
