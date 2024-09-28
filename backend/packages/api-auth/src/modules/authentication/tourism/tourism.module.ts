import { Module } from '@nestjs/common';
import {TourismController} from './tourism.controller';
import {TourismService} from './tourism.service';

@Module({
  controllers: [TourismController],
  providers: [TourismService],
  exports: [TourismService],
})
export class AuthModule {}
