import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        log: [
          `id=1ea02a51-0da4-4fb3-81bb-d6af0d9a9649`,
          `service_name=admin`,
          `process=admin.2590.8390929646293`,
          `sample#load_avg_1m=0.88`,
          `sample#load_avg_5m=0.68`,
          `sample#load_avg_15m=0.49`,
        ]
      })
      .expect(201)
      .expect({
        id: '1ea02a51-0da4-4fb3-81bb-d6af0d9a9649',
        service_name: 'admin',
        process: 'admin.2590.8390929646293',
        'sample#load_avg_1m': '0.88',
        'sample#load_avg_5m': '0.68',
        'sample#load_avg_15m': '0.49'
      });
  });
});
