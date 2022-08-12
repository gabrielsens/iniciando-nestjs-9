import { Module } from '@nestjs/common';
import { BanckAccountsCrudService } from './banck-accounts-crud.service';
import { BanckAccountsCrudController } from './banck-accounts-crud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanckAccountsCrud } from './entities/banck-accounts-crud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BanckAccountsCrud])],
  controllers: [BanckAccountsCrudController],
  providers: [BanckAccountsCrudService],
})
export class BanckAccountsCrudModule {}
