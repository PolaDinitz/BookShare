import { Test, TestingModule } from '@nestjs/testing';
import { BooksRecommendationEngineService } from './books-recommendation-engine.service';

describe('BooksRecommendationEngineService', () => {
  let service: BooksRecommendationEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksRecommendationEngineService],
    }).compile();

    service = module.get<BooksRecommendationEngineService>(BooksRecommendationEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
