import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: "Date and time of the order" })
  date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cardNumber: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: "Expiry date of the card" })
  expiryDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cvv: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsNotEmpty()
  @ApiProperty({
    type: [CreateOrderItemDto],
    description: "List of order items",
  })
  orderItems: CreateOrderItemDto[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  total: number;
}

export class UpdateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  itemIds: string[];
}
