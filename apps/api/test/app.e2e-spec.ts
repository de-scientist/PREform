import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { ApiExceptionFilter } from './../src/common/api-exception.filter.js';
import { PrismaService } from './../src/prisma/prisma.service.js';

describe('Health endpoints (e2e)', () => {
  let app: INestApplication<App>;
  let queryRaw: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    queryRaw = vi.fn().mockResolvedValue([{ '?column?': 1 }]);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({ $queryRaw: queryRaw })
      .compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new ApiExceptionFilter(app.get(HttpAdapterHost)));
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('reports liveness without requiring a database', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health/live')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('reports readiness when the database responds', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health/ready')
      .expect(200)
      .expect({ status: 'ready' });
  });

  it('returns a safe, actionable error when the database is unavailable', () => {
    queryRaw.mockRejectedValue(new Error('connection details are private'));

    return request(app.getHttpServer())
      .get('/api/v1/health/ready?api_key=do-not-echo')
      .expect(503)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          statusCode: 503,
          error: 'SERVICE_UNAVAILABLE',
          message: 'Database is unavailable',
          path: '/api/v1/health/ready',
        });
        expect(body.timestamp).toEqual(expect.any(String));
        expect(JSON.stringify(body)).not.toContain('do-not-echo');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
