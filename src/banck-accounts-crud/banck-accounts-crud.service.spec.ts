import { Test, TestingModule } from '@nestjs/testing';
import { BanckAccountsCrudService } from './banck-accounts-crud.service';

describe('BanckAccountsCrudService', () => {
  let service: BanckAccountsCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BanckAccountsCrudService],
    }).compile();

    service = module.get<BanckAccountsCrudService>(BanckAccountsCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
