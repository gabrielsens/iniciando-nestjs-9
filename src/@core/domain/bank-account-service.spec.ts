import { DataSource, Repository } from 'typeorm';
import { BankAccountTypeOrmRepository } from '../infra/db/bank-account-typeorm.repository';
import { BankAccountTypeOrmShema } from '../infra/db/bank-account-typeorm.schema';
import { BankAccount } from './bank-account';
import { BankAccountService } from './bank-account.service';

describe('Bank Account Service Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountTypeOrmShema>;
  let repository: BankAccountTypeOrmRepository;
  let bankAccountService: BankAccountService;
  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [BankAccountTypeOrmShema],
    });
    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccountTypeOrmShema);
    repository = new BankAccountTypeOrmRepository(ormRepo);
    bankAccountService = new BankAccountService(repository);
  });

  it('Should create a new bank account', async () => {
    await bankAccountService.create('1111-11');
    const model = await ormRepo.findOneBy({ account_number: '1111-11' });
    expect(model.id).toBe('123');
    expect(model.balance).toBe(0);
    expect(model.account_number).toBe('1111-11');
  });
});
