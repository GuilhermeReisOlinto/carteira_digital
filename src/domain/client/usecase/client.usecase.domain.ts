import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IClient, TPayload, TReturnPayload } from "../interface/client.interface";
import { IClientRepository } from "src/infra/database/interface/client.interface";
import { IAccount } from "src/domain/account/interface/account.interface";

@Injectable()
export class ClientDomain implements IClient {
    constructor (
        @Inject('IClientRepository')
        private readonly repository: IClientRepository,
        @Inject('IAccount')
        private readonly accountUsecase: IAccount
    ) {}

    async headleClient(payload: TPayload): Promise<TReturnPayload> {
        const {cpf_document, email} = payload;
        
        const existClient = await this.repository.findOneDocumentCpf(cpf_document);
        if (existClient) {
            throw new ConflictException('Client already exists.');
        }
        
        const existNickClient = await this.repository.findNickName(email);
        if (existNickClient) {
            throw new ConflictException('email already used.');
        }
        
        const { account_id, account_number, verifying_digit } = await this.accountUsecase.generateAccount();
        
        payload.account_id = account_id.toString();
        
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