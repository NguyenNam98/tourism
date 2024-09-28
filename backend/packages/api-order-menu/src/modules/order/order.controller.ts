import {
  Body,
  Controller, Delete,
  Get, Param, Post, Put,
  UsePipes, ValidationPipe,
} from '@nestjs/common'
import { OrderService } from './order.service'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import {TBaseDto, TMetaData} from "../../app.typing";
import {MetaData} from "../../decorators/metaData.decorator";
import {CreateOrderDto, UpdateOrderDto} from "./order.dto";
import {MenuItem} from "../../entities/order/menu_item.entity";

// restaurantId: a0897519-901a-4833-a806-a0d9605b89a3,
//tableId: 9b94c736-0d23-45e4-ac46-464a6eb80b0c
@ApiTags('tour')
@ApiHeader({
  name: 'au-payload',
  schema: {
    default: '{"userId": "2139f7c0-cfaa-4610-9e54-b59f442df88e"}',
  },
})
@Controller({
  path: 'order',
  version: '1',
})
export class OrderController {
  constructor(private readonly tourService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async playAnOrder(
      @Body() order: CreateOrderDto,
      @MetaData() meta: TMetaData,
  ): Promise<TBaseDto<string>> {
    return {
      data: await this.tourService.createAnOrder(order, meta.userId),
    }
  }

  @Get('/')
  @UsePipes(ValidationPipe)
  async getOrderByUser(
      @MetaData() meta: TMetaData,
  ): Promise<TBaseDto<{
    id: string,
    restaurantId: string,
    tableId: string,
    items: string[],
    status: number,
    orderedItems: MenuItem[]
  }[]>> {
    return {
      data: await this.tourService.getOrderByUser(meta.userId),
    }
  }

  @Put('/:orderId')
  @UsePipes(ValidationPipe)
  async UpdateItemOrder(
      @Param('orderId') id: string, // Capture the route parameter
      @Body() order: UpdateOrderDto,
      @MetaData() meta: TMetaData,
  ): Promise<TBaseDto<void>> {
    return {
      data: await this.tourService.updateOrder(meta.userId, id, order),
    }
  }

  @Delete('/:orderId')
  @UsePipes(ValidationPipe)
  async RemoveOrder(
      @Param('orderId') id: string, // Capture the route parameter
      @MetaData() meta: TMetaData,
  ): Promise<TBaseDto<void>> {
    return {
      data: await this.tourService.cancelOrder(meta.userId, id),
    }
  }

}
