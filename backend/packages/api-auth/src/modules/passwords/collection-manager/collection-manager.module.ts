import { Module } from '@nestjs/common';
import {CollectionManagerController} from './collection-manager.controller';
import {CollectionManagerService} from './collection-manager.service';

@Module({
  controllers: [CollectionManagerController],
  providers: [CollectionManagerService],
  exports: [CollectionManagerService],
})
export class AuthModule {}
