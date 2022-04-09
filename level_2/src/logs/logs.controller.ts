import { Body, Controller, Post } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogDto, FormattedLogDto } from "./dto";

@Controller()
export class LogsController {
  constructor(private readonly appService: LogsService) {
  }

  @Post()
  async processLog(@Body() body: LogDto): Promise<FormattedLogDto> {
    const formattedLog: FormattedLogDto = await this.appService.processLog(body.log);

    return formattedLog;
  }
}
