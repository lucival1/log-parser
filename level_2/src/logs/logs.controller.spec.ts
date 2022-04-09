import { Test, TestingModule } from '@nestjs/testing';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { LogDto } from "./dto";

describe('AppController Unit Test', () => {
  let logsController: LogsController;
  let spyService: LogsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: LogsService,
      useFactory: () => ({
        processLog: jest.fn(() => [])
      })
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [LogsService, ApiServiceProvider],
    }).compile();

    logsController = app.get<LogsController>(LogsController);
    spyService = app.get<LogsService>(LogsService);
  });

  it("calling processLog method", () => {
    const dto = new LogDto();

    expect(logsController.processLog(dto)).not.toEqual(null);
    expect(spyService.processLog).toHaveBeenCalled();
    expect(spyService.processLog).toHaveBeenCalledTimes(1);
    expect(spyService.processLog).toHaveBeenCalledWith(dto.log);
  });
});
