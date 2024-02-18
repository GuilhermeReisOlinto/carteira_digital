import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IHandleAccount } from "../interface/account.interface";
import { IAccountRepository } from "src/infra/database/interface/account.interface";
import { IClientRepository } from "src/infra/database/interface/client.interface";
import { IAuthorizeTransfer } from "src/infra/interface/central.bank.interface";

@Injectable()
export class HandleAccount implements IHandleAccount {
    constructor(
        @Inject('IAccountRepository')
        private readonly accountRepository: IAccountRepository,
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository,
        @Inject('IAuthorizeTransfer')
        private readonly  authorizationHttp: IAuthorizeTransfer
    ) {}

    async verifyBalance(account_id: number) {

        const data_account = await this.accountRepository.findOne(account_id);
        const { account_balance } = data_account;

        return {
            account_balance
        }
    }

    async trasnferMoney(payload: any) {
        const { account_number } = payload;

        const data_account = await this.accountRepository.findOneByAccount(account_number);
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

    async confirmTransfer(payload: any) {
        const account_id = 1

        const data_account = await this.accountRepository.findOne(account_id);
        const { account_balance } = data_account;

        if (payload.account_balance > account_balance) {
            throw new ConflictException('Saldo insuficiente.');
        }

        const result = await this.authorizationHttp.authorizeTransfer(payload);
        if (result.data.message !== 'Autorizado') {
            throw new ConflictException('Não autorizado.');
        }

        return await this.confirmTransfer(payload);

    }

    async confirmingTransfer(payload) {
        const { account_number, account_balance } = payload;

        const resultUpdate = await this.accountRepository.updateBalanceAccount(account_number, account_balance);
        console.log(resultUpdate)
        return resultUpdate
    }
}