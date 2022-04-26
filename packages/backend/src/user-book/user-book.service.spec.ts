import { Test, TestingModule } from '@nestjs/testing';
import { UserBookService } from './user-book.service';

describe('UserBookService', () => {
  let service: UserBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBookService],
    }).compile();

    service = module.get<UserBookService>(UserBookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
