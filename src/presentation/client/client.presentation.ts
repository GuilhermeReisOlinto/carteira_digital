import {  Body, Controller, Inject, Post } from "@nestjs/common";
import { IClientUsecase } from "src/domain/client/interface/client.interface";

@Controller('api/v1')
export class ClientPresentation {
    constructor (
        @Inject('IClientUsecase')
        private readonly clientdomain: IClientUsecase
    ) {}

    @Post('create')
    createClient(@Body() payload) {
        return this.clientdomain.headleClient(payload)
    }
}