import { Inject, Injectable } from "@nestjs/common";
import { IHandleAccount } from "../interface/account.interface";
import { IAccountRepository } from "src/infra/database/interface/account.interface";

@Injectable()
export class HandleAccount implements IHandleAccount {
    constructor(
        @Inject('IAccountRepository')
        private readonly repository: IAccountRepository,
    ) {}

    async verifyBalance(account_id: number) {

        const data_account = await this.repository.findOne(account_id);
        const { account_balance } = data_account;

        return {
            account_balance
        }
    }
}