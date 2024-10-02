import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { TBaseDto } from "../../app.typing";
import {
  CreateRestaurantDto,
  CreateRestaurantTableDto,
} from "./restaurant.dto";
import { Restaurant } from "../../entities/table_reservation/restaurant.enty";
import { RestaurantTable } from "../../entities/table_reservation/table.entity";

@ApiTags("restaurant")
@ApiHeader({
  name: "au-payload",
  schema: {
    default: '{"userId": "2139f7c0-cfaa-4610-9e54-b59f442df88e"}',
  },
})
@Controller({
  path: "restaurant",
  version: "1",
})
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createTour(
    @Body() restaurant: CreateRestaurantDto
  ): Promise<TBaseDto<string>> {
    return {
      data: await this.restaurantService.createRestaurant(restaurant),
    };
  }

  @Get("/list")
  @UsePipes(ValidationPipe)
  async getListRestaurant(): Promise<TBaseDto<Restaurant[]>> {
    return {
      data: await this.restaurantService.getListRestaurant(),
    };
  }

  @Get("/list")
  @UsePipes(ValidationPipe)
  async getListRestaurantByType(
    @QueryParam("type") type: string
  ): Promise<TBaseDto<Restaurant[]>> {
    return {
      data: await this.restaurantService.getListRestaurantByType(type),
    };
  }

  @Get("/:id")
  @UsePipes(ValidationPipe)
  async getDetailRestaurant(
    @Param("id") id: string // Capture the route parameter
  ): Promise<
    TBaseDto<{
      restaurant: Restaurant;
      tables: RestaurantTable[];
    }>
  > {
    return {
      data: await this.restaurantService.getRestaurantById(id),
    };
  }

  @Post("table/:restaurantId")
  @UsePipes(ValidationPipe)
  async createTable(
    @Param("restaurantId") id: string, // Capture the route parameter
    @Body() table: CreateRestaurantTableDto
  ): Promise<TBaseDto<string>> {
    return {
      data: await this.restaurantService.createTable(id, table),
    };
  }

  @Get("table/:tableId")
  @UsePipes(ValidationPipe)
  async getTableDetail(
    @Param("restaurantId") id: string // Capture the route parameter
  ): Promise<TBaseDto<RestaurantTable>> {
    return {
      data: await this.restaurantService.getTableDetail(id),
    };
  }
}
function QueryParam(
  arg0: string
): (
  target: RestaurantController,
  propertyKey: "getListRestaurantByType",
  parameterIndex: 0
) => void {
  throw new Error("Function not implemented.");
}
