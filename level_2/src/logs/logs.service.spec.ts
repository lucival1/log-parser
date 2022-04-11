import { Test, TestingModule } from '@nestjs/testing';
import { LogsService } from './logs.service';
import { LogDto, FormattedLogDto } from "./dto";
import { DynamicImport } from "../helpers/dynamicImport";

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
  const formattedLog: FormattedLogDto = {
    id: '1ea02a51-0da4-4fb3-81bb-d6af0d9a9649',
    service_name: 'admin',
    process: 'admin.2590.8390929646293',
    'sample#load_avg_1m': '0.88',
    'sample#load_avg_5m': '0.68',
    'sample#load_avg_15m': '0.49'
  }
  const processedLogSample: FormattedLogDto = {
    ...formattedLog,
    'slow_computation': '0.0009878'
  }

  beforeEach(async () => {
    const DynamicImportProvider = {
      provide: DynamicImport,
      useFactory: () => ({
        slowComputing: {
          compute: jest.fn((data) => {
            return {...data, 'slow_computation': '0.0009878'}
          })
        }
      })
    }

    const app: TestingModule = await Test.createTestingModule({
      providers: [LogsService, DynamicImportProvider],
    }).compile();

    logsService = app.get<LogsService>(LogsService);
  });

  describe('When call processLog method with expected param', () => {
    it("should return a FormattedLogDto", async () => {
      const logsServiceSpy = jest.spyOn(logsService, 'processLog');
      const dto = new LogDto();
      dto.log = logSample;
      const result = await logsService.processLog(dto.log);

      expect(logsServiceSpy).toHaveBeenCalledWith(dto.log);
      expect(result).toStrictEqual(processedLogSample);
    });
  });
});
