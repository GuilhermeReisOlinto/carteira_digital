import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { IAccount } from "src/domain/account/interface/account.interface";
import { AuthGuard } from "../middleware/auth.guards.middleware";
import { IBalanceAccount } from "src/domain/account/interface/balance.account.interface";
import { IHandleAccount } from "src/domain/account/interface/handler.account.interface";

type TPayload = {
    account_number: string;
    verifying_digit: string;
    transfer_value?: string;
}

@Controller('api/v1')
export class AccountPresentation {
    constructor(
        @Inject('IHandleAccount')
        private readonly handlerAccountDomain: IHandleAccount,
        @Inject('IBalanceAccount')
        private readonly balanceAccount: IBalanceAccount,
        @Inject('IAccount')
        private readonly accountDomain: IAccount,
    ) {}

    @UseGuards(AuthGuard)
    @Get('balance')
    balance(@Param('account_id') account_id: number) {
       return this.accountDomain.verifyBalance(account_id); 
    }

    @UseGuards(AuthGuard)
    @Post('transfer')
    transfer(@Body() payload: TPayload) {
        return this.handlerAccountDomain.transferMoney(payload);
    }

    @UseGuards(AuthGuard)
    @Post('confirm/transfer')
    confirmTransfer(@Body() payload: TPayload){
        return this.handlerAccountDomain.confirmTransfer(payload);
    }
    
    @UseGuards(AuthGuard)
    @Post('insert/balance')
    insertBalance(@Body() payload){
        return this.balanceAccount.updateBalance(payload);
    }
}