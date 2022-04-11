import { Inject, Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import { DynamicImport } from "../helpers/dynamicImport";
import { FormattedLogDto } from "./dto";
const client = createClient();

(async () => {
  await client.connect()
  await client.ping();
})();

@Injectable()
export class LogsService {
  constructor(@Inject(DynamicImport) private readonly lib: any) {
  }

  async processLog(log: string[]): Promise<FormattedLogDto> {
    const formattedLog: FormattedLogDto = log.reduce((acc, log) => {
      const splitLog = log.split('=');

      return {...acc, [splitLog[0]]: splitLog[1]};
    }, {} as FormattedLogDto);

    const processedLog: FormattedLogDto = await this.lib.slowComputing.compute(formattedLog);
    await client.lPush('log', JSON.stringify(processedLog));

    return processedLog;
  }
}
