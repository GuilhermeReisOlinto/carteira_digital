import { Module } from "@nestjs/common";
import { ClientPresentation } from "./client/client.presentation";
import { DomainModule } from "src/domain/domain.module";
import { AccountPresentation } from "./account/account.presentation";
import { AuthenticatedPresentation } from "./authenticated/authenticated.presentation";

@Module({
    imports: [DomainModule],
    controllers: [ClientPresentation, AccountPresentation, AuthenticatedPresentation]
})
export class PresentationModule {}