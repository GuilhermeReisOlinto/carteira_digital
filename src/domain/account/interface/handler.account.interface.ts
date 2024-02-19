export type TPayloadTrasferMoney = {
    account_number: string;
    verifying_digit: string;
    transfer_value?: string;
    account_id?: number;
}

export type TReturnTrasferMoney = {
	name: string;
	cpf_document: string;
	account_number: string;
	verifying_digit: string;
}

export interface IHandleAccount {
    transferMoney(payload: TPayloadTrasferMoney): Promise<TReturnTrasferMoney>
    confirmTransfer(payload: TPayloadTrasferMoney): Promise<string>
    confirmingTransfer(payload: TPayloadTrasferMoney)
}