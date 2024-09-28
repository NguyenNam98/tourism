import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;
}


export class CreateRestaurantTableDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  tableNumber: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  restaurantId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  numberSeat: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  detail: string;
}