import {
  IsCreditCard,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTourDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  maxParticipant: number;
}

export class CreateTourServicesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;
}

export class CreateBookingDto {
  @IsOptional() // If userId can be empty or null
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  tourId: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsNumber()
  maxParticipants: number;

  @IsNotEmpty()
  cardNumber: string;

  @IsNotEmpty()
  @IsDateString() // Assuming expiryDate is a date in ISO format (like "2023-12")
  expiryDate: string;

  @IsNotEmpty()
  @IsString()
  cvv: string;
}
