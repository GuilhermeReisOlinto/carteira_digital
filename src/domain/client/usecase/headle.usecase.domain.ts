import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IClientUsecase } from "../interface/client.interface";
import { IClientRepository } from "src/infra/database/interface/client.interface";
import { IAccount } from "../interface/account.interface";

@Injectable()
export class ClientDomain implements IClientUsecase {
    constructor (
        @Inject('IClientRepository')
        private readonly repository: IClientRepository,
        @Inject('IAccount')
        private readonly usecaseAccount: IAccount
    ) {}

    async headleClient(payload) {
        const {cpf_document, email} = payload;
        
        const existClient = await this.repository.findOne(cpf_document);
        if (existClient) {
            throw new ConflictException('Client already exists.');
        }
        
        const existNickClient = await this.repository.findNick(email);
        if (existNickClient) {
            throw new ConflictException('email already used.');
        }
        
        const { account_id, account_number, verifying_digit } = await this.usecaseAccount.generate();
        
        payload.account_id = account_id;
  
        const createClient = await this.repository.create(payload);
        const {createdAt, name} = createClient;

        return {
            createdAt,
            name,
            account_number,
            verifying_digit
        }
    }
}