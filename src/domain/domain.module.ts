import { Module } from "@nestjs/common";
import { ClientDomain } from "./client/usecase/headle.usecase.domain";
import { InfraModule } from "src/infra/infra.module";
import { AccountDomain } from "./client/usecase/account.usecase.domain";
import { HandleAccount } from "./account/usecase/handle.account.usecase.domain";

@Module({
    providers: [
        ClientDomain,
        {
            provide: 'IClientUsecase',
            useExisting: ClientDomain
        },
        AccountDomain,
        {
            provide: 'IAccount',
            useExisting: AccountDomain
        },
        HandleAccount,
        {
            provide: 'IHandleAccount',
            useExisting: HandleAccount
        }
    ],
    exports: [
        {
            provide: 'IClientUsecase',
            useExisting: ClientDomain
        },
        {
            provide: 'IHandleAccount',
            useExisting: HandleAccount
        }
    ],
    imports: [InfraModule]
})
export class DomainModule {}