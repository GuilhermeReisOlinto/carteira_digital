import { Controller, Get, Inject, Param } from "@nestjs/common";
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
}