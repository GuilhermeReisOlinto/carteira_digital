import { Controller, Post } from "@nestjs/common";

@Controller('api/v1')
export class AuthenticatedPresentation {
    constructor (
        
    ) {}

    @Post('authenticated')
    auth() {
        return this
    }    
}