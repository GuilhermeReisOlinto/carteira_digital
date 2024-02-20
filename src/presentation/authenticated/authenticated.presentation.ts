import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IAuthenticated } from "src/domain/authenticated/interface/authenticated.interface";

export interface IAuthenticatedController {
    auth(payload): any
}

@Controller('api/v1')
export class AuthenticatedPresentation implements IAuthenticatedController {
    constructor (
        @Inject('IAuthenticated')
        private readonly authenticatedDomain: IAuthenticated
    ) {}

    @Post('authenticated')
    auth(@Body() payload) {
        return this.authenticatedDomain.signIn(payload)
    }
}