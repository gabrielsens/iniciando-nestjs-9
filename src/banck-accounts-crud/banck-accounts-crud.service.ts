import { Inject, Injectable } from '@nestjs/common';
import { getDataSourceToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBanckAccountsCrudDto } from './dto/create-banck-accounts-crud.dto';
import { UpdateBanckAccountsCrudDto } from './dto/update-banck-accounts-crud.dto';
import { BanckAccountsCrud } from './entities/banck-accounts-crud.entity';

@Injectable()
export class BanckAccountsCrudService {
  constructor(
    @InjectRepository(BanckAccountsCrud)
    private repo: Repository<BanckAccountsCrud>,
    @Inject(getDataSourceToken())
    private dataSource: DataSource,
  ) {}

  async create(createBanckAccountsCrudDto: CreateBanckAccountsCrudDto) {
    const bankAccount = this.repo.create({
      account_number: createBanckAccountsCrudDto.account_number,
      balance: 0,
    });

    await this.repo.insert(bankAccount);
    return bankAccount;
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(id: string, updateBanckAccountsCrudDto: UpdateBanckAccountsCrudDto) {
    return `This action updates a #${id} banckAccountsCrud`;
  }

  remove(id: string) {
    return `This action removes a #${id} banckAccountsCrud`;
  }

  async transfer(from: string, to: string, amount: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const fromAccount = await this.repo.findOneBy({ account_number: from });
      const toAccount = await this.repo.findOneBy({ account_number: to });

      fromAccount.balance -= amount;
      toAccount.balance += amount;

      this.repo.save(fromAccount);
      this.repo.save(toAccount);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    }
  }
}
