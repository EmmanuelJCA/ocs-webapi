import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST)', () =>
    request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@smith.com',
        password: 'password',
      })
      .expect(200));

  it('/auth/signin (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'john@smith.com',
        password: 'password',
      })
      .expect(200);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    accessToken = response.body.token.accessToken as string;
  });

  it('/auth/me (GET)', () =>
    request(app.getHttpServer())
      .get('/auth/me')
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(200));

  afterAll(() => app.close());
});
