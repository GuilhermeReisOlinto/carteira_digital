import { Module } from "@nestjs/common";
import { ClientPresentation } from "./client/client.presentation";
import { DomainModule } from "src/domain/domain.module";

@Module({
    imports: [DomainModule],
    controllers: [ClientPresentation]
})
export class PresentationModule {}