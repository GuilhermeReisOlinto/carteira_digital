import { Inject, Injectable } from "@nestjs/common";
import { IBalanceAccount, IInsertBalance } from "../interface/balance.account.interface";
import { IAccountRepository } from "src/infra/database/interface/account.interface";

@Injectable()
export class BalanceAccount implements IBalanceAccount {
    constructor (
        @Inject('IAccountRepository')
        private readonly accountRepository: IAccountRepository,
    ) {}

    async updateBalance(payload: IInsertBalance): Promise<string> {
        const { account_id, account_balance } = payload;

        const { account_number } = await this.accountRepository.findOneById(account_id);
    
        await this.accountRepository.updateBalanceAccount(account_number, account_balance);
        
        return 'Success!'
    }
}