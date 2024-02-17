import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { dataBaseConfig } from "./database/connection/sqlite.database";
import { ClientEntity } from "./database/entities/client.entity";
import { ClientRepository } from "./database/repository/client.repository";
import { AccountEntity } from "./database/entities/account.entity";
import { AccountRepository } from "./database/repository/account.repository";

@Module({
    imports: [
        SequelizeModule.forFeature([ClientEntity, AccountEntity]),
    ],
    providers: [
        ClientRepository,
        {
            provide: 'IClientRepository',
            useExisting: ClientRepository
        },
        AccountRepository,
        {
            provide: 'IAccountRepository',
            useExisting: AccountRepository
        }
    ],
    exports: [
        {
            provide: 'IClientRepository',
            useExisting: ClientRepository
        },
        {
            provide: 'IAccountRepository',
            useExisting: AccountRepository
        }
    ]

})
export class InfraModule {}