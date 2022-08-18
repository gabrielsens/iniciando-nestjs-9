import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { BankAccountService } from '../@core/domain/bank-account.service';
import { BanckAccountsCrudService } from './banck-accounts-crud.service';
import { CreateBanckAccountsCrudDto } from './dto/create-banck-accounts-crud.dto';
import { TransferBankAccountDto } from './dto/transfer-bank-accounts-crud.dto';
import { UpdateBanckAccountsCrudDto } from './dto/update-banck-accounts-crud.dto';

@Controller('banck-accounts-crud')
export class BanckAccountsCrudController {
  constructor(
    private readonly banckAccountsCrudService: BanckAccountsCrudService,
    private readonly bankAccountService: BankAccountService,
  ) {}

  @Post()
  create(@Body() createBanckAccountsCrudDto: CreateBanckAccountsCrudDto) {
    return this.bankAccountService.create(
      createBanckAccountsCrudDto.account_number,
    );
  }

  @Get()
  findAll() {
    return this.banckAccountsCrudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banckAccountsCrudService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBanckAccountsCrudDto: UpdateBanckAccountsCrudDto,
  ) {
    return this.banckAccountsCrudService.update(id, updateBanckAccountsCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banckAccountsCrudService.remove(id);
  }

  @HttpCode(204)
  @Post('transfer')
  transfer(@Body() transferDto: TransferBankAccountDto) {
    return this.bankAccountService.transfer(
      transferDto.from,
      transferDto.to,
      transferDto.amount,
    );
  }
}
