export type TPayment = {
    account_number: string;
    verifying_digit: string;
    transfer_value?: string;
    account_id?: number;
}
export type TReturnPayment = {
    message: string,
}

export interface IPaymentConfirmation {
    authorizeTransfer(payload: TPayment): Promise<TReturnPayment>
}