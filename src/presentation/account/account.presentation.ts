import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { IHandleAccount } from "src/domain/account/interface/account.interface";

@Controller('api/v1')
export class AccountPresentation {
    constructor(
        @Inject('IHandleAccount')
        private readonly accountDomain: IHandleAccount
    ) {}

    @Get('balance/:account_id')
    balance(@Param('account_id') account_id: number) {
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