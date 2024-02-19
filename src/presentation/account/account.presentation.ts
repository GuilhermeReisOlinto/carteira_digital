import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { IHandleAccount } from "src/domain/account/interface/account.interface";
import { AuthGuard } from "../middleware/auth.guards.middleware";

@Controller('api/v1')
export class AccountPresentation {
    constructor(
        @Inject('IHandleAccount')
        private readonly accountDomain: IHandleAccount
    ) {}

    @UseGuards(AuthGuard)
    @Get('balance')
    balance(@Param('account_id') account_id: number) {
        console.log(account_id)
       return this.accountDomain.verifyBalance(account_id); 
    }

    @Post('transfer')
    transfer(@Body() payload) {
        return this.accountDomain.trasnferMoney(payload);
    }

    @Post('confirm/transfer')
    confirmTransfer(@Body() payload){
        return this.accountDomain.confirmTransfer(payload);
    }
}