import { Injectable } from "@nestjs/common";
import { IAccountRepository } from "../interface/account.interface";
import { InjectModel } from "@nestjs/sequelize";
import { AccountEntity } from "../entities/account.entity";

@Injectable()
export class AccountRepository implements IAccountRepository {
    constructor (
        @InjectModel(AccountEntity)
        private readonly accountRepository: typeof AccountEntity
    ) {}

    create(payload: any) {
        return this.accountRepository.create(payload)
    }
}