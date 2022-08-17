import { BankAccount } from './bank-account';

describe('Bank Account Unit tests', () => {
  it('should create a banlk account', () => {
    const bankAccount = new BankAccount('123', 100, '1234');
    expect(bankAccount.id).toBe('123');
    expect(bankAccount.balance).toBe(100);
    expect(bankAccount.account_number).toBe('1234');
  });

  test('should debit an account', () => {
    const bankAccount = new BankAccount('123', 100, '1234');
    bankAccount.debit(50);
    expect(bankAccount.balance).toBe(50);
  });

  test('should credit an account', () => {
    const bankAccount = new BankAccount('123', 100, '1234');
    bankAccount.credit(50);
    expect(bankAccount.balance).toBe(150);
  });
});
