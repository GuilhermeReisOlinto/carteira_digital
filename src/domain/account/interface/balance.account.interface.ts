export type IInsertBalance = {
    account_id: number;
    account_balance: string;
}

export interface IBalanceAccount {
    updateBalance(payload: IInsertBalance): Promise<string>
}