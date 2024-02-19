import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { INotifications, TPayment } from "../interface/notification.interface";

@Injectable()
export class SendSms implements INotifications {
    constructor (
        private readonly httpService: HttpService
    ) {}

    async sendSms(payload: TPayment): Promise<boolean> {
        try {
            const base_url = process.env.SEND_SMS_URL;

            const result = await lastValueFrom(this.httpService.get(base_url));

            return result.data;
        } catch (error) {
            throw new HttpException(error.response.status, error.response.data);
        }
    }
}