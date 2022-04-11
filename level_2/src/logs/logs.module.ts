import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { DynamicImport } from '../helpers/dynamicImport';

@Module({
  imports: [],
  controllers: [LogsController],
  providers: [LogsService, DynamicImport],
})
export class LogsModule {
}
