import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { Order } from "entities/order/order.entity";
import { TBaseDto, TMetaData } from "../../app.typing";
import { MetaData } from "../../decorators/metaData.decorator";
import { CreateOrderDto } from "./order.dto";
import { OrderService } from "./order.service";

@ApiTags("tour")
@ApiHeader({
  name: "au-payload",
  schema: {
    default: '{"userId": "2139f7c0-cfaa-4610-9e54-b59f442df88e"}',
  },
})
@Controller({
  path: "order",
  version: "1",
})
export class OrderController {
  constructor(private readonly tourService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async placeAnOrder(
    @Body() order: CreateOrderDto,
    @MetaData() meta: TMetaData
  ): Promise<TBaseDto<string>> {
    return {
      data: await this.tourService.createAnOrder(order, meta.userId),
    };
  }

  @Get("/")
  @UsePipes(ValidationPipe)
  async getOrderByUser(
    @MetaData() meta: TMetaData
  ): Promise<TBaseDto<Order[]>> {
    return {
      data: await this.tourService.getOrderByUser(meta.userId),
    };
  }

  @Delete("/:orderId")
  @UsePipes(ValidationPipe)
  async RemoveOrder(
    @Param("orderId") id: string, // Capture the route parameter
    @MetaData() meta: TMetaData
  ): Promise<TBaseDto<void>> {
    return {
      data: await this.tourService.cancelOrder(meta.userId, id),
    };
  }
}
