import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  restaurantId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ description: "Number of persons in the reservation" })
  noPersons: number;

  @IsString()
  @ApiProperty({ required: false })
  note: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: "Date and time of the reservation" })
  date: Date;
}
