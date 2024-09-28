import {IsArray, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tableId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  restaurantId: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  itemIds: string[];

}

export class UpdateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  itemIds: string[];

}