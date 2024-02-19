export type TReturnAccount = { 
    account_id: number;
    account_number:string;
    verifying_digit: string;
}
export interface IAccount {
    generateAccount(): Promise<TReturnAccount>
}