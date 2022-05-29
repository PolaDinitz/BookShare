import { Module } from '@nestjs/common';
import { BooksRecommendationEngineService } from './books-recommendation-engine.service';
import { BooksRecommendationEngineController } from './books-recommendation-engine.controller';

@Module({
  providers: [BooksRecommendationEngineService],
  controllers: [BooksRecommendationEngineController]
})
export class BooksRecommendationEngineModule {}
