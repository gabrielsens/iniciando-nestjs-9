import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { BanckAccountsCrudModule } from './banck-accounts-crud/banck-accounts-crud.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountTypeOrmShema } from './@core/infra/db/bank-account-typeorm.schema';
// ES7 decorators - maneira elegante de extender uma classe
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [BankAccountTypeOrmShema],
    }),
    BankAccountsModule,
    BanckAccountsCrudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
