import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
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

export class CreateReservationDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tableId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  note: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  startAt: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  endAt!: Date;
}