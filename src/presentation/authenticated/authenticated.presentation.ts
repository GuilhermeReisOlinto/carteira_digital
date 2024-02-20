import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IAuthenticated } from "src/domain/authenticated/interface/authenticated.interface";

export type TAuthenticated = {
    email: string;
    password: string;
}

export interface IAuthenticatedController {
    auth(payload: TAuthenticated): any
}

@Controller('api/v1')
export class AuthenticatedPresentation implements IAuthenticatedController {
    constructor (
        @Inject('IAuthenticated')
        private readonly authenticatedDomain: IAuthenticated
    ) {}

    @Post('authenticated')
    auth(@Body() payload: TAuthenticated) {
        return this.authenticatedDomain.signIn(payload)
    }
}