export type TReturnAccount = { 
    account_id: number;
    account_number:string;
    verifying_digit: string;
}
export type IReturnBalance = {
	account_balance: string;
}
export interface IAccount {
    generateAccount(): Promise<TReturnAccount>
    verifyBalance(account_id: number): Promise<IReturnBalance>
    findAccount(account_id: number): any
}