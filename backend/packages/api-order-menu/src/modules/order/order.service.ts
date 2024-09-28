import { Injectable } from '@nestjs/common'
import {DataSource, In} from 'typeorm'
import { BusinessException } from 'app.exception'
import {DatabaseModule} from "../../database.module";
import {DATABASE_NAMES} from "../../app.constant";
import {InjectDataSource} from "@nestjs/typeorm";
import {CreateOrderDto, UpdateOrderDto} from "./order.dto";
import {Order} from "../../entities/order/order.entity";
import {MenuItem} from "../../entities/order/menu_item.entity";

@Injectable()
export class OrderService {
  constructor(
      @InjectDataSource(DatabaseModule.getConnectionName(DATABASE_NAMES.POSTGRES))
      private masterConnection: DataSource,
  ) {}

  async createAnOrder(
      dataOrder: CreateOrderDto,
      userId: string
  ): Promise<string> {
    const tableInProcess = await this.masterConnection.getRepository(Order).findOne({
       where: {
          isValid: true,
          status: 1,
          tableId: dataOrder.tableId,
          restaurantId: dataOrder.restaurantId,
       }
    })

    if (tableInProcess) {
      throw new BusinessException('Table is in process')
    }
    const orderByUser = await this.masterConnection.getRepository(Order).findOne({
      where: {
        userId,
        status: 1,
      }
    })
    if (orderByUser) {
      throw new BusinessException('User has an order in process')
    }
    const p = await this.masterConnection
        .getRepository(Order)
        .insert({
          tableId: dataOrder.tableId,
          restaurantId: dataOrder.restaurantId,
          status: 1,
          items: dataOrder.itemIds,
          userId
        })
    return p.identifiers[0].id
  }

  async getOrderByUser(
      userId: string
  ): Promise<{
    id: string,
    restaurantId: string,
    tableId: string,
    items: string[],
    status: number,
    orderedItems: MenuItem[]
  }[]> {
    const orderByUser = await this.masterConnection
        .getRepository(Order)
        .find({
            where: {
              userId,
              isValid: true,
            },
          select: ['id', 'restaurantId', 'tableId', 'items', 'status']
        })
    if (!orderByUser.length) {
      return []
    }
    const result = []
    for (const item of orderByUser) {
      const menuItems = await this.masterConnection.getRepository(MenuItem).find({
        where: {
          id: In(item.items)
        },
        select: ['id', 'title', 'description', "price"]
      })
      result.push({
        ...item,
        orderedItems: menuItems
      })
    }
    return result
  }

  async updateOrder(
      userId: string,
      orderId: string,
      dataOrder: UpdateOrderDto
  ): Promise<void> {
    const orderByUser = await this.masterConnection
        .getRepository(Order)
        .findOne({
          where: {
            userId,
            status: 1,
            id: orderId
          },
          select: ['id', 'restaurantId', 'tableId', 'items', 'status']
        })
    if (!orderByUser) {
      throw new BusinessException('Order not found')
    }

    await this.masterConnection.getRepository(Order)
        .update({
          id: orderId
        }, {
          items: dataOrder.itemIds
        })
  }

  async cancelOrder(
      userId: string,
      orderId: string,
  ): Promise<void> {
    const orderByUser = await this.masterConnection
        .getRepository(Order)
        .findOne({
          where: {
            userId,
            status: 1,
            id: orderId
          },
          select: ['id', 'restaurantId', 'tableId', 'items', 'status']
        })
    if (!orderByUser) {
      throw new BusinessException('Order not found')
    }

    await this.masterConnection.getRepository(Order)
        .update({
          id: orderId
        }, {
          status: 3 // 3: canceled
        })
  }

}
