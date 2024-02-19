import { Module } from "@nestjs/common";
import { ClientDomain } from "./client/usecase/headle.usecase.domain";
import { InfraModule } from "src/infra/infra.module";
import { AccountDomain } from "./client/usecase/account.usecase.domain";
import { HandleAccount } from "./account/usecase/handle.account.usecase.domain";
import { AuthService } from "./authenticated/usecase/authenticated.usecase";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

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
        AuthService,
        {
            provide: 'IAuthenticated',
            useExisting: AuthService
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
            useExisting: AuthService
        }
    ],
})
export class DomainModule {}