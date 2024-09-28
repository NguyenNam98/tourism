import { Module } from '@nestjs/common'
import { BookTourController } from './book-tour.controller'
import { BookTourService } from './book-tour.service'

@Module({
  controllers: [BookTourController],
  providers: [BookTourService],
})
export class BookTourModule {}
