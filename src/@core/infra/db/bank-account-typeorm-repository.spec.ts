import { DataSource, Repository } from 'typeorm';
import { BankAccountTypeOrmRepository } from './bank-account-typeorm.repository';
import { BankAccountTypeOrmShema } from './bank-account-typeorm.schema';
import { BankAccount } from '../../domain/bank-account';

describe('Bank Account TypeOrm Repository Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountTypeOrmShema>;
  let repository: BankAccountTypeOrmRepository;
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
  });

  it('Should insert a new bank account', async () => {
    const bankAccount = new BankAccount('123', 100, '1111-11');
    await repository.insert(bankAccount);
    const model = await ormRepo.findOneBy({ account_number: '1111-11' });
    expect(model.id).toBe('123');
    expect(model.balance).toBe(100);
    expect(model.account_number).toBe('1111-11');
  });
});
