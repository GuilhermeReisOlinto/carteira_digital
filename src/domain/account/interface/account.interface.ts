export interface IHandleAccount {
    verifyBalance(account_id: number): any
    trasnferMoney(payload): any
    confirmTrasnfer(payload): any
}