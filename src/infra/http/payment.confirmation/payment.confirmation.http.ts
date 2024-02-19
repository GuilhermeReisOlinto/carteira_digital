import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { IPaymentConfirmation, TPayment, TReturnPayment } from "src/infra/http/interface/payment.interface";

@Injectable()
export class PaymentConfirmation implements IPaymentConfirmation {
    constructor (
        private readonly httpService: HttpService
    ) {}

    async authorizeTransfer(payload: TPayment): Promise<TReturnPayment> {
        try {
            const base_url = process.env.AUTHORIZATED_URL;

            const result = await lastValueFrom(this.httpService.get(base_url));

            return result.data;
        } catch (error) {
            throw new HttpException(error.response.status, error.response.data);
        }
    }
}