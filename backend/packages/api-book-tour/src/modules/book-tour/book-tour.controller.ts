import {
  Body,
  Controller,
  Get, Param, Post,
  UsePipes, ValidationPipe,
} from '@nestjs/common'
import { BookTourService } from './book-tour.service'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import {TBaseDto, TMetaData} from "../../app.typing";
import {Tour} from "../../entities/tour/tour.entity";
import {MetaData} from "../../decorators/metaData.decorator";
import {BookingTour} from "../../entities/tour/booking_tour.entity";
import {CreateTourDto, CreateTourServicesDto} from "./book-tour.dto";
import {TourServices} from "../../entities/tour/tour_services.entity";

@ApiTags('tour')
@ApiHeader({
  name: 'au-payload',
  schema: {
    default: '{"userId": "2139f7c0-cfaa-4610-9e54-b59f442df88e"}',
  },
})
@Controller({
  path: 'tour',
  version: '1',
})
export class BookTourController {
  constructor(private readonly tourService: BookTourService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createTour(
      @Body() tour: CreateTourDto,
  ): Promise<TBaseDto<string>> {
    return {
      data: await this.tourService.createTour(tour),
    }
  }

  @Get('/list')
  @UsePipes(ValidationPipe)
  async getListTourDetail(
  ): Promise<TBaseDto<Tour[]>> {
    return {
      data: await this.tourService.getListTour(),
    }
  }
  @Get('/:id')
  @UsePipes(ValidationPipe)
  async getDetailTour(
      @Param('id') id: string, // Capture the route parameter

  ): Promise<TBaseDto<Tour>> {
    return {
      data: await this.tourService.getTourById(id),
    }
  }

  // create tour services
  @Post('service/:tourId')
  @UsePipes(ValidationPipe)
  async createTourService(
      @Body() service: CreateTourServicesDto,
      @Param('tourId') tourId: string,
  ): Promise<TBaseDto<string>> {
    return {
      data: await this.tourService.createTourService(tourId, service),
    }
  }

  @Get('service/:tourId')
  @UsePipes(ValidationPipe)
  async getTourService(
      @Param('tourId') tourId: string,
  ): Promise<TBaseDto<TourServices[]>> {
    return {
      data: await this.tourService.getTourServiceByTourId(tourId),
    }
  }
  // book tour
  @Get('/book/list')
  @UsePipes(ValidationPipe)
  async getBookedTour(
      @MetaData() meta: TMetaData,
  ): Promise<TBaseDto<{
    tours: Tour[],
    bookingTours: BookingTour[]
  }>> {
    const userId = meta.userId
    return {
      data: await this.tourService.getBookedTourByUserId(userId),
    }
  }
  @Get('/book/:id')
  @UsePipes(ValidationPipe)
  async bookTour(
      @Param('id') id: string, // Capture the route parameter
      @MetaData() meta: TMetaData,
  ): Promise<TBaseDto<string>> {
    const userId = meta.userId
    return {
      data: await this.tourService.bookATour(userId, id),
    }
  }

}
