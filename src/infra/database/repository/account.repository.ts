import { Injectable } from "@nestjs/common";
import { IAccountRepository } from "../interface/account.interface";
import { InjectModel } from "@nestjs/sequelize";
import { AccountEntity } from "../entities/account.entity";
import { Sequelize } from "sequelize";

@Injectable()
export class AccountRepository implements IAccountRepository {
    constructor (
        @InjectModel(AccountEntity)
        private readonly accountRepository: typeof AccountEntity
    ) {}

    create(payload: any) {
        return this.accountRepository.create(payload)
    }

    findOne(account_id: number) {
        return this.accountRepository.findOne({ where: { account_id: account_id } })
    }

    findOneByAccount(account_number: number) {
        return this.accountRepository.findOne({ where: { account_number: account_number } })
    }

    updateBalanceAccount(account_number: number, account_balance: string) {
        const updatedAccount = this.accountRepository.update(
            { account_balance: Sequelize.literal(`balance - ${account_balance}`) },
            { where: { account_number: account_number } }
          );
        
        return updatedAccount;
    }
}