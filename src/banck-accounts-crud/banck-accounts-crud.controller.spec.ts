import { Test, TestingModule } from '@nestjs/testing';
import { BanckAccountsCrudController } from './banck-accounts-crud.controller';
import { BanckAccountsCrudService } from './banck-accounts-crud.service';

describe('BanckAccountsCrudController', () => {
  let controller: BanckAccountsCrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BanckAccountsCrudController],
      providers: [BanckAccountsCrudService],
    }).compile();

    controller = module.get<BanckAccountsCrudController>(
      BanckAccountsCrudController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
