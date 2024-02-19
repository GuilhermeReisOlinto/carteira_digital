import { Injectable } from "@nestjs/common";
import { IClientRepository, TPayload } from "../interface/client.interface";
import { InjectModel } from '@nestjs/sequelize';
import { ClientEntity } from "../entities/client.entity";

@Injectable()
export class ClientRepository implements IClientRepository {
    constructor (
        @InjectModel(ClientEntity)
        private readonly clientRepository: typeof ClientEntity
    ) {}

    create(payload: TPayload): Promise<TPayload> {
        return this.clientRepository.create(payload)
    }

    findOneDocumentCpf(cpf_document: string): any {
        return this.clientRepository.findOne({ where: { cpf_document: cpf_document } });
    }

    findNickName(email: string): any {
        return this.clientRepository.findOne({ where: { email: email } });
    }

    findOneByAccount(account_id: number) {
        return this.clientRepository.findOne({ where: { account_id: account_id } });
    }
}