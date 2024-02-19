import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IHandleAccount } from "../interface/account.interface";
import { IAccountRepository } from "src/infra/database/interface/account.interface";
import { IClientRepository } from "src/infra/database/interface/client.interface";
import { IPaymentConfirmation } from "src/infra/http/interface/payment.interface";
import { INotifications } from "src/infra/http/interface/notification.interface";

@Injectable()
export class HandleAccount implements IHandleAccount {
    constructor(
        @Inject('IAccountRepository')
        private readonly accountRepository: IAccountRepository,
        @Inject('IClientRepository')
        private readonly clientRepository: IClientRepository,
        @Inject('IPaymentConfirmation')
        private readonly  authorizationHttp: IPaymentConfirmation,
        @Inject('INotifications')
        private readonly  notificationsHttp: INotifications
    ) {}

    async verifyBalance(account_id: number) {

        const data_account = await this.accountRepository.findOneById(account_id);
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
        const { account_id } =  payload;

        const data_account = await this.accountRepository.findOneById(account_id);
        const { account_balance } = data_account;
        
        if (payload.transfer_value < account_balance) {
            throw new ConflictException('Saldo insuficiente.');
        }

        const result = await this.authorizationHttp.authorizeTransfer(payload);
        if (result.message !== 'Autorizado') {
            throw new ConflictException('Não autorizado.');
        }

        await this.confirmingTransfer(payload);

        await this.removedMoneyAccount(data_account, payload.transfer_value);

        return 'Success!';
    }

    async confirmingTransfer(payload) {
        const { account_number, transfer_value } = payload;

        const resultUpdate = await this.accountRepository.updateBalanceAccount(account_number, transfer_value);
        
        await this.notificationsHttp.sendSms(payload);

        return resultUpdate
    }

    async removedMoneyAccount(payload, transfer_value) {
        const { account_number, } = payload;

        return await this.accountRepository.updateBalanceAccountSub(account_number, transfer_value);
    }
}
