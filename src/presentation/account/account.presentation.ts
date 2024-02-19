import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { IHandleAccount } from "src/domain/account/interface/account.interface";
import { AuthGuard } from "../middleware/auth.guards.middleware";
import { IBalanceAccount } from "src/domain/account/interface/balance.account.interface";

@Controller('api/v1')
export class AccountPresentation {
    constructor(
        @Inject('IHandleAccount')
        private readonly accountDomain: IHandleAccount,
        @Inject('IBalanceAccount')
        private readonly balanceAccount: IBalanceAccount
    ) {}

    @UseGuards(AuthGuard)
    @Get('balance')
    balance(@Param('account_id') account_id: number) {
       return this.accountDomain.verifyBalance(account_id); 
    }

    @UseGuards(AuthGuard)
    @Post('transfer')
    transfer(@Body() payload) {
        return this.accountDomain.trasnferMoney(payload);
    }

    @UseGuards(AuthGuard)
    @Post('confirm/transfer')
    confirmTransfer(@Body() payload){
        return this.accountDomain.confirmTransfer(payload);
    }
    
    @UseGuards(AuthGuard)
    @Post('insert/balance')
    insertBalance(@Body() payload){
        return this.balanceAccount.updateBalance(payload);
    }
}