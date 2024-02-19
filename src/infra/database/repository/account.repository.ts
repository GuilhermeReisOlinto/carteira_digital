import { Injectable } from "@nestjs/common";
import { IAccountRepository, TAccount, TReturnAccount } from "../interface/account.interface";
import { InjectModel } from "@nestjs/sequelize";
import { AccountEntity } from "../entities/account.entity";
import { Sequelize } from "sequelize";

@Injectable()
export class AccountRepository implements IAccountRepository {
    constructor (
        @InjectModel(AccountEntity)
        private readonly accountRepository: typeof AccountEntity
    ) {}

    async create(payload: TAccount): Promise<TReturnAccount> {
        return await this.accountRepository.create(payload)
    }

    async findOneById(account_id: number) {
        return await this.accountRepository.findOne({ where: { account_id: account_id } })
    }

    findOneByAccount(account_number: string) {
        return this.accountRepository.findOne({ where: { account_number: account_number } })
    }

    async updateBalanceAccount(account_number: string, account_balance: string) {

        const updatedAccount = await this.accountRepository.update(
            { account_balance: Sequelize.literal(`saldo_conta + ${account_balance}`) },
            { where: { account_number: account_number } }
          );

        return updatedAccount;
    }

    async updateBalanceAccountSub(account_number: string, account_balance: string) {

        const updatedAccount = await this.accountRepository.update(
            { account_balance: Sequelize.literal(`saldo_conta - ${account_balance}`) },
            { where: { account_number: account_number } }
          );

        return updatedAccount;
    }
}