import {Test, TestingModule} from '@nestjs/testing';
import {LogsService} from './logs.service';
import {LogDto, ProcessedLogDto} from "./dto";
import * as fs from "fs";

describe('AppService Unit Test', () => {
  let logsService: LogsService;
  const logSample: string[] = [
    `id=1ea02a51-0da4-4fb3-81bb-d6af0d9a9649`,
    `service_name=admin`,
    `process=admin.2590.8390929646293`,
    `sample#load_avg_1m=0.88`,
    `sample#load_avg_5m=0.68`,
    `sample#load_avg_15m=0.49`,
  ];
  const processedLogSample: ProcessedLogDto = {
    id: '1ea02a51-0da4-4fb3-81bb-d6af0d9a9649',
    service_name: 'admin',
    process: 'admin.2590.8390929646293',
    'sample#load_avg_1m': '0.88',
    'sample#load_avg_5m': '0.68',
    'sample#load_avg_15m': '0.49'
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [LogsService],
    }).compile();

    logsService = app.get<LogsService>(LogsService);
  });

  describe('When call processLog method with expected param', () => {
    it("should return a FormattedLogDto", () => {
      const logsServiceSpy = jest.spyOn(logsService, 'processLog');
      const dto = new LogDto();
      dto.log = logSample;
      const result = logsService.processLog(dto.log);

      expect(logsServiceSpy).toHaveBeenCalledWith(dto.log);
      expect(result).toStrictEqual(processedLogSample);
    });
  });

  describe('When call storeLog method with expected param', () => {
    it("should save the file and return a copy of the data", () => {
      const logsServiceSpy = jest.spyOn(logsService, 'storeLog');
      logsService.storeLog(processedLogSample);

      const filePath = `parsed/#${processedLogSample.id}.json`;
      const file = JSON.parse(fs.readFileSync(filePath).toString());

      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });

      expect(logsServiceSpy).toHaveBeenCalledWith(processedLogSample);
      expect(file).toStrictEqual(processedLogSample);
    });
  });
});
