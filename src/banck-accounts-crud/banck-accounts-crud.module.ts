import { Module } from '@nestjs/common';
import { BanckAccountsCrudService } from './banck-accounts-crud.service';
import { BanckAccountsCrudController } from './banck-accounts-crud.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountTypeOrmShema } from '../@core/infra/db/bank-account-typeorm.schema';
import { BankAccountService } from '../@core/domain/bank-account.service';
import { DataSource } from 'typeorm';
import { BankAccountTypeOrmRepository } from '../@core/infra/db/bank-account-typeorm.repository';
import { BankAccountRepository } from '../@core/domain/bank-account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountTypeOrmShema])],
  controllers: [BanckAccountsCrudController],
  providers: [
    BanckAccountsCrudService,
    {
      provide: BankAccountTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new BankAccountTypeOrmRepository(
          dataSource.getRepository(BankAccountTypeOrmShema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: BankAccountService,
      useFactory: (repo: BankAccountRepository) => {
        return new BankAccountService(repo);
      },
      inject: [BankAccountTypeOrmRepository],
    },
  ],
})
export class BanckAccountsCrudModule {}
