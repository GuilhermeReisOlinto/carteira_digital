import { Inject, Injectable } from "@nestjs/common";
import { IAccountRepository } from "src/infra/database/interface/account.interface";
import { IAccount, IReturnBalance, TReturnAccount } from "../interface/account.interface";

@Injectable()
export class AccountDomain implements IAccount {
    constructor (
        @Inject('IAccountRepository')
        private readonly accountRepository: IAccountRepository,
    ) {}

    async generateAccount(): Promise<TReturnAccount> {
        const account_number_number = Math.floor(Math.random() * (999999 -  111111 + 1)) + 11111;
        
        const account_number_string = account_number_number.toString();
        
        const verifying_digit_number = Math.floor(Math.random() * (99 -  11 + 1)) + 11;

        const verifying_digit_string = verifying_digit_number.toString();
        
        const account_opening_balance: string = "0.00";

        const payload = {
            account_number: account_number_string,
            verifying_digit: verifying_digit_string,
            account_balance: account_opening_balance
        }

        const account = await this.accountRepository.create(payload);
        const { account_id, account_number, verifying_digit } = account;

        return { account_id, account_number, verifying_digit };
    }

    async verifyBalance(account_id: number): Promise<IReturnBalance> {

        const data_account = await this.accountRepository.findOneById(account_id);
        const { account_balance } = data_account;

        return {
            account_balance
        }
    }
}