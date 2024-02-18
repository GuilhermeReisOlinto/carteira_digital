import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { dataBaseConfig } from "./database/connection/sqlite.database";
import { ClientEntity } from "./database/entities/client.entity";
import { ClientRepository } from "./database/repository/client.repository";
import { AccountEntity } from "./database/entities/account.entity";
import { AccountRepository } from "./database/repository/account.repository";
import { AuthorizeTransfer } from "./http/central.bank/authorizes.transfer.http";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        SequelizeModule.forFeature([ClientEntity, AccountEntity]),
        HttpModule
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
        },
        AuthorizeTransfer,
        {
            provide: 'IAuthorizeTransfer',
            useExisting: AuthorizeTransfer
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
        },
        {
            provide: 'IAuthorizeTransfer',
            useExisting: AuthorizeTransfer
        }
    ]

})
export class InfraModule {}