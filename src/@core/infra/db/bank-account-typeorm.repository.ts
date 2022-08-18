import { BankAccount } from 'src/@core/domain/bank-account';
import { BankAccountRepository } from 'src/@core/domain/bank-account.repository';

import { Repository } from 'typeorm';
import { BankAccountTypeOrmShema } from './bank-account-typeorm.schema';

export class BankAccountTypeOrmRepository implements BankAccountRepository {
  constructor(private ormRepo: Repository<BankAccountTypeOrmShema>) {}

  async insert(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create(bankAccount);
    await this.ormRepo.insert(model);
  }

  async findByAccountNumber(account_number: string): Promise<BankAccount> {
    const model = await this.ormRepo.findOneBy({
      account_number: account_number,
    });
    return new BankAccount(model.balance, model.account_number, model.id);
  }

  async update(bankAccount: BankAccount) {
    this.ormRepo.update(bankAccount.id, {
      balance: bankAccount.balance,
    });
  }
}
