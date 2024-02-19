import { Module } from "@nestjs/common";
import { ClientDomain } from "./client/usecase/client.usecase.domain";
import { InfraModule } from "src/infra/infra.module";
import { AccountDomain } from "./client/usecase/account.usecase.domain";
import { HandleAccount } from "./account/usecase/handle.account.usecase.domain";
import { AuthDomain } from "./authenticated/usecase/authenticated.usecase";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BalanceAccount } from "./account/usecase/balance.account.usecase.domain";

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
              global: true,
              secret: configService.get<string>('SECRET_JWT'),
              signOptions: { expiresIn: '3600s' },
            }),
            inject: [ConfigService],
        }),
        InfraModule
    ],
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
        },
        AuthDomain,
        {
            provide: 'IAuthenticated',
            useExisting: AuthDomain
        },
        BalanceAccount,
        {
            provide: 'IBalanceAccount',
            useExisting: BalanceAccount
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
        },
        {
            provide: 'IAuthenticated',
            useExisting: AuthDomain
        },
        {
            provide: 'IBalanceAccount',
            useExisting: BalanceAccount
        }
    ],
})
export class DomainModule {}