import { BankAccount } from 'src/@core/domain/bank-account';
import { BankAccountRepository } from 'src/@core/domain/bank-account.repository';

import { Repository } from 'typeorm';
import { BankAccountTypeOrmShema } from './bank-account-typeorm.schema';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private ormRepo: Repository<BankAccountTypeOrmShema>) {}

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create(bankAccount);
    await this.ormRepo.save(model);
  }
}
