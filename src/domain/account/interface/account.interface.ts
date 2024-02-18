export interface IHandleAccount {
    verifyBalance(account_id: number): any
    trasnferMoney(payload): any
    confirmTransfer(payload): any
    confirmingTransfer(payload): any
}