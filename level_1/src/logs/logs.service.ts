import { Injectable } from '@nestjs/common';
import { ProcessedLogDto } from "./dto";
import * as fs from "fs";

@Injectable()
export class LogsService {
  processLog(log: string[]): ProcessedLogDto {
    const processedLog: ProcessedLogDto = log.reduce((acc, log) => {
      const splitLog = log.split('=');

      return {...acc, [splitLog[0]]: splitLog[1]};
    }, {} as ProcessedLogDto);

    return processedLog;
  }

  storeLog(log: ProcessedLogDto): string {
    const formattedLog: string = JSON.stringify(log, null, 4);
    fs.writeFileSync(`src/logs/parsed/#${log.id}.json`, formattedLog);

    return JSON.parse(formattedLog);
  }
}
