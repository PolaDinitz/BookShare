import { Test, TestingModule } from '@nestjs/testing';
import { BooksRecommendationEngineController } from './books-recommendation-engine.controller';

describe('BooksRecommendationEngineController', () => {
  let controller: BooksRecommendationEngineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksRecommendationEngineController],
    }).compile();

    controller = module.get<BooksRecommendationEngineController>(BooksRecommendationEngineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
