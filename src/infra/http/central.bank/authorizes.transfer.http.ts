import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { IAuthorizeTransfer } from "src/infra/interface/central.bank.interface";

@Injectable()
export class AuthorizeTransfer implements IAuthorizeTransfer {
    constructor (
        private readonly httpService: HttpService
    ) {}

    async authorizeTransfer(payload: any) {
        try {
            const base_url = process.env.AUTHORIZATED_URL;

            const result = await lastValueFrom(this.httpService.get(base_url));
            console.log(result)

            return result;
        } catch (error) {
            throw new HttpException(error.response.status, error.response.data);
        }
    }
}