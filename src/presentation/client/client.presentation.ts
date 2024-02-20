import {  Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { IClient } from "src/domain/client/interface/client.interface";

export interface IClientController {
    createClient(payload: TPayload): any
}

export type TPayload = {
    name: string;
    cpf_document: string;
    email: string;
    nick_name: string;
    password: string;
	account_id: string;
}

@Controller('api/v1')
export class ClientPresentation implements IClientController {
    constructor (
        @Inject('IClientUsecase')
        private readonly clientDomain: IClient
    ) {}

    @Post('create')
    createClient(@Body() payload: TPayload) {
        return this.clientDomain.headleClient(payload)
    }
}