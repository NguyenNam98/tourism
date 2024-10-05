import { Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import { BusinessException } from "app.exception";
import { DatabaseModule } from "../../database.module";
import { DATABASE_NAMES } from "../../app.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { CreateOrderDto, UpdateOrderDto } from "./order.dto";
import { Order } from "../../entities/order/order.entity";
import { MenuItem } from "../../entities/order/menu_item.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectDataSource(DatabaseModule.getConnectionName(DATABASE_NAMES.POSTGRES))
    private masterConnection: DataSource
  ) {}

  async createAnOrder(
    dataOrder: CreateOrderDto,
    userId: string
  ): Promise<string> {
    const p = await this.masterConnection.getRepository(Order).insert({
      status: 1,
      userId,
      ...dataOrder,
    });
    return p.identifiers[0].id;
  }

  async getOrderByUser(userId: string): Promise<Order[]> {
    const orderByUser = await this.masterConnection.getRepository(Order).find({
      where: {
        userId,
        isValid: true,
      },
    });

    return orderByUser;
  }

  async cancelOrder(userId: string, orderId: string): Promise<void> {
    const orderByUser = await this.masterConnection
      .getRepository(Order)
      .findOne({
        where: {
          userId,
          status: 1,
          id: orderId,
        },
      });
    if (!orderByUser) {
      throw new BusinessException("Order not found");
    }

    await this.masterConnection.getRepository(Order).update(
      {
        id: orderId,
      },
      {
        status: 3, // 3: canceled
      }
    );
  }
}
