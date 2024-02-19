export interface IAccountRepository {
    create(payload): any
    findOneById(account_id: number): any
    findOneByAccount(account_number: number): any
    updateBalanceAccount(account_number: number, account_balance: string): any
    updateBalanceAccountSub(account_number: number, account_balance: string): any
}