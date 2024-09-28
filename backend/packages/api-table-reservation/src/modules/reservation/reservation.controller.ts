import {
  Body,
  Controller,
  Get, Param, Post, Put,
  UsePipes, ValidationPipe,
} from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import {TBaseDto, TMetaData} from "../../app.typing";
import {CreateReservationDto} from "./reservation.dto";
import {MetaData} from "../../decorators/metaData.decorator";

@ApiTags('reservation')
@ApiHeader({
  name: 'au-payload',
  schema: {
    default: '{"userId": "2139f7c0-cfaa-4610-9e54-b59f442df88e"}',
  },
})
@Controller({
  path: 'reservation',
  version: '1',
})
export class ReservationController {
  constructor(private readonly tourService: ReservationService) {}

  @Post(":restaurantId")
  @UsePipes(ValidationPipe)
  async bookTable(
      @Body() restaurant: CreateReservationDto,
      @Param('restaurantId') restaurantId: string,
      @MetaData() meta: TMetaData,

  ): Promise<TBaseDto<string>> {
    return {
      data: await this.tourService.bookATable(restaurantId, restaurant, meta.userId),
    }
  }
  @Put("/cancel:bookId")
  @UsePipes(ValidationPipe)
  async cancelBook(
      @Param('bookId') bookId: string,
  ): Promise<TBaseDto<{}>> {
    await this.tourService.CancelBookTable(bookId)
    return {
      data: {}
    }
  }


  @Get("/list/booked")
  @UsePipes(ValidationPipe)
  async getListBooked(
      @MetaData() meta: TMetaData,
  ): Promise<TBaseDto<{}>> {
    const userId = meta.userId
    await this.tourService.getListBooked(userId)
    return {
      data: {}
    }
  }

}
