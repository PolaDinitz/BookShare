import { Test, TestingModule } from '@nestjs/testing';
import { UserBookController } from './user-book.controller';
import { UserBookService } from './user-book.service';

describe('UserBookController', () => {
  let controller: UserBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBookController],
      providers: [UserBookService],
    }).compile();

    controller = module.get<UserBookController>(UserBookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
