import { Inject, Injectable } from "@nestjs/common";
import { IBalanceAccount } from "../interface/balance.account.interface";
import { IAccountRepository } from "src/infra/database/interface/account.interface";

@Injectable()
export class BalanceAccount implements IBalanceAccount {
    constructor (
        @Inject('IAccountRepository')
        private readonly accountRepository: IAccountRepository,
    ) {}
    async updateBalance(payload) {
        const { account_id, account_balance } = payload;

        const { account_number } = await this.accountRepository.findOne(account_id);
    
        await this.accountRepository.updateBalanceAccount(account_number, account_balance);
        
        return 'Success!'
    }
}