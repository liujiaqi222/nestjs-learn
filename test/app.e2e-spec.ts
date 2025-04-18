import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();
    appService = app.get<AppService>(AppService); // 获取service类，之后可以使用它的getEmojis方法
    await app.init();
  });

  describe('/ GET', () => {
    it('未提供正确的api key，应该返回403', () => {
      return request(server).get('/').set('x-api-key', 'INVALID').expect(403);
    });

    it('未提供api key，应该返回403', () => {
      return request(server).get('/').expect(403);
    });

    it('应该返回一个随机的emoji', () => {
      const emojis = appService.getEmojis();
      return request(server)
        .get('/')
        .set('x-api-key', 'SECRET')
        .expect(200)
        .expect(({ body }) => {
          console.log(body);
          expect(emojis).toContain(body.data.emoji); // 响应返回的emoji的范围在appService.getEmojis()的返回范围内
          expect(body.data.browser).toBe('Unknown');
        });
    });

    it('应该返回相应的user agent', () => {
      const emojis = appService.getEmojis();
      return request(server)
        .get('/')
        .set('x-api-key', 'SECRET')
        .set('user-agent', 'Chrome')
        .expect(200)
        .expect(({ body }) => {
          console.log(body);
          expect(emojis).toContain(body.data.emoji);
          expect(body.data.browser).toBe('Chrome');
        });
    });

    it('传入正确的index应该返回对应的emoji', () => {
      const emojis = appService.getEmojis();
      const index = 0;
      const expectEmoji = emojis[index];
      return request(server)
        .get(`/?index=${index}`)
        .set('x-api-key', 'SECRET')
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.emoji).toBe(expectEmoji);
        });
    });

    it('应该返回400，如果传入的index不在范围内', () => {
      const emojiLength = appService.getEmojis().length;
      const range = emojiLength + 1;
      return request(server)
        .get(`/?index=${range}`)
        .set('x-api-key', 'SECRET')
        .expect(400);
    });

    it('应该返回400，如果传入的index不是数字', () => {
      const range = 'hello'
      return request(server)
        .get(`/?index=${range}`)
        .set('x-api-key', 'SECRET')
        .expect(400);
    });
  });
});
