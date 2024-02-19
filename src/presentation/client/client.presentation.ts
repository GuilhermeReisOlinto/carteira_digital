import {  Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { IClient } from "src/domain/client/interface/client.interface";
import { AuthGuard } from "../middleware/auth.guards.middleware";

export type TPayload = {
    name: string;
    cpf_document: string;
    email: string;
    nick_name: string;
    password: string;
	account_id: string;
}

@Controller('api/v1')
export class ClientPresentation {
    constructor (
        @Inject('IClientUsecase')
        private readonly clientDomain: IClient
    ) {}

    @UseGuards(AuthGuard)
    @Post('create')
    createClient(@Body() payload: TPayload) {
        return this.clientDomain.headleClient(payload)
    }
}