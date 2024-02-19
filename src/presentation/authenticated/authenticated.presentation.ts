import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IAuthenticated } from "src/domain/authenticated/interface/authenticated.interface";

@Controller('api/v1')
export class AuthenticatedPresentation {
    constructor (
        @Inject('IAuthenticated')
        private readonly authenticatedDomain: IAuthenticated
    ) {}

    @Post('authenticated')
    auth(@Body() payload) {
        return this.authenticatedDomain.signIn(payload)
    }
}