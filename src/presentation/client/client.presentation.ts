import {  Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { IClientUsecase } from "src/domain/client/interface/client.interface";
import { AuthGuard } from "../middleware/auth.guards.middleware";

@Controller('api/v1')
export class ClientPresentation {
    constructor (
        @Inject('IClientUsecase')
        private readonly clientdomain: IClientUsecase
    ) {}

    @UseGuards(AuthGuard)
    @Post('create')
    createClient(@Body() payload) {
        return this.clientdomain.headleClient(payload)
    }
}