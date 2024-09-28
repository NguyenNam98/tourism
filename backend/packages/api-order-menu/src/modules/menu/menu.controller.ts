import {
  Body,
  Controller,
  Get, Param, Post,
  UsePipes, ValidationPipe,
} from '@nestjs/common'
import { MenuService } from './menu.service'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import {TBaseDto} from "../../app.typing";
import {CreateMenuItemDto} from "./menu.dto";
import {MenuItem} from "../../entities/order/menu_item.entity";

@ApiTags('menu')
@ApiHeader({
  name: 'au-payload',
  schema: {
    default: '{"userId": "2139f7c0-cfaa-4610-9e54-b59f442df88e"}',
  },
})
@Controller({
  path: 'menu',
  version: '1',
})
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post("/:restaurantId")
  @UsePipes(ValidationPipe)
  async createTour(
      @Body() menuItem: CreateMenuItemDto,
      @Param('restaurantId') restaurantId: string,
  ): Promise<TBaseDto<string>> {
    return {
      data: await this.menuService.createMenuItem(restaurantId, menuItem),
    }
  }

  @Get('/:restaurantId')
  @UsePipes(ValidationPipe)
  async getMenuOfRestaurant(
      @Param('restaurantId') restaurantId: string,
  ): Promise<TBaseDto<MenuItem[]>> {
    return {
      data: await this.menuService.getMenuByRestaurantId(restaurantId),
    }
  }
  @Get('/item/:id')
  @UsePipes(ValidationPipe)
  async getDetailItem(
      @Param('id') id: string, // Capture the route parameter
  ): Promise<TBaseDto<MenuItem>> {
    return {
      data: await this.menuService.getMenuItemById(id),
    }
  }
}
