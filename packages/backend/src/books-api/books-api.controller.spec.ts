import { Test, TestingModule } from '@nestjs/testing';
import { BooksApiController } from './books-api.controller';

describe('BooksApiController', () => {
  let controller: BooksApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksApiController],
    }).compile();

    controller = module.get<BooksApiController>(BooksApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
