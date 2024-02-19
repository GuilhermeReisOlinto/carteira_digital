export type TPayment = {
    account_number: string;
    verifying_digit: string;
    transfer_value?: string;
    account_id?: number;
}

export interface INotifications {
    sendSms(payload: TPayment): Promise<boolean>
}