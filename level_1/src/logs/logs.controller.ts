import {Body, Controller, Post} from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogDto, ProcessedLogDto } from "./dto";

@Controller()
export class LogsController {
  constructor(private readonly appService: LogsService) {
  }

  @Post()
  processLog(@Body() body: LogDto): string {
    const processedLog: ProcessedLogDto = this.appService.processLog(body.log);

    return this.appService.storeLog(processedLog);
  }
}
