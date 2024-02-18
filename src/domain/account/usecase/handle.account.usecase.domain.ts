import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IHandleAccount } from "../interface/account.interface";
import { IAccountRepository } from "src/infra/database/interface/account.interface";
import { IClientRepository } from "src/infra/database/interface/client.interface";

@Injectable()
export class HandleAccount implements IHandleAccount {
    constructor(
        @Inject('IAccountRepository')
        private readonly repository: IAccountRepository,
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository,
    ) {}

    async verifyBalance(account_id: number) {

        const data_account = await this.repository.findOne(account_id);
        const { account_balance } = data_account;

        return {
            account_balance
        }
    }

    async trasnferMoney(payload: any) {
        const { account_number } = payload;

        const data_account = await this.repository.findOneByAccount(account_number);
        if(!data_account){
            throw new NotFoundException('Account not exist.');
        }

        const { verifying_digit, account_id } = data_account;
        if (verifying_digit !== payload.verifying_digit) {
            throw new ConflictException('Divergent check digit.')
        }

        const data_client_destination = await this.clientRepository.findOneByAccount(account_id)
        const { name, cpf_document } = data_client_destination;

        return {
            name,
            cpf_document,
            account_number,
            verifying_digit
        }
    }

    async confirmTrasnfer(payload: any) {
        const account_id = 1

        const data_account = await this.repository.findOne(account_id);
        const { account_balance } = data_account;



    }
}