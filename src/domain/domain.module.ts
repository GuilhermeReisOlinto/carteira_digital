import { Module } from "@nestjs/common";
import { ClientDomain } from "./client/usecase/headle.usecase.domain";
import { InfraModule } from "src/infra/infra.module";
import { AccountDomain } from "./client/usecase/account.usecase.domain";

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
        }
    ],
    exports: [
        {
            provide: 'IClientUsecase',
            useExisting: ClientDomain
        }
    ],
    imports: [InfraModule]
})
export class DomainModule {}