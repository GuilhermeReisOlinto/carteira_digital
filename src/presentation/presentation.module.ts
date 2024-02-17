import { Module } from "@nestjs/common";
import { ClientPresentation } from "./client/client.presentation";
import { DomainModule } from "src/domain/domain.module";
import { AccountPresentation } from "./account/account.presentation";

@Module({
    imports: [DomainModule],
    controllers: [ClientPresentation, AccountPresentation]
})
export class PresentationModule {}