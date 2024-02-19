export type TAccount = {
    account_number: string;
    verifying_digit: string;
    account_balance: string;
}

export type TReturnAccount = {
    account_id: number;
    account_number: string;
    verifying_digit: string;
    account_balance: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IAccountRepository {
    create(payload: TAccount): Promise<TReturnAccount>
    findOneById(account_id: number): Promise<TReturnAccount>
    findOneByAccount(account_number: string): Promise<TReturnAccount>
    updateBalanceAccount(account_number: string, account_balance: string): any
    updateBalanceAccountSub(account_number: string, account_balance: string): any
}