import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/authentication/auth.module';
import { UsersModule } from './modules/user/user.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [AppController]
    }).compile();

    appController = app.get<AppController>(AppController);
  });


  describe('root', () => {
    it('should fail to login', () => {
      expect(appController.login({ email : "notreal@notexist.com", password: "notexist"})).toThrowError;
    }) 
  });
});
