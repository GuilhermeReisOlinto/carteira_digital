import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { dataBaseConfig } from "./database/connection/sqlite.database";
import { ClientEntity } from "./database/entities/client.entity";
import { ClientRepository } from "./database/repository/client.repository";
import { AccountEntity } from "./database/entities/account.entity";
import { AccountRepository } from "./database/repository/account.repository";
import { PaymentConfirmation } from "./http/payment.confirmation/payment.confirmation.http";
import { HttpModule } from "@nestjs/axios";
import { SendSms } from "./http/notifications/send.sms.http";

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
        PaymentConfirmation,
        {
            provide: 'IPaymentConfirmation',
            useExisting: PaymentConfirmation
        },
        SendSms,
        {
            provide: 'INotifications',
            useExisting: SendSms
        },
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
            provide: 'IPaymentConfirmation',
            useExisting: PaymentConfirmation
        },
        {
            provide: 'INotifications',
            useExisting: SendSms
        },
    ]

})
export class InfraModule {}