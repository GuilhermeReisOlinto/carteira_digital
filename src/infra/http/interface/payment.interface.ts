export type TReturnPayment = {
    message: string,
}

export interface IPaymentConfirmation {
    authorizeTransfer(payload: any): Promise<TReturnPayment>
}