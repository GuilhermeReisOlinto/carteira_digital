export interface IAccountRepository {
    create(payload): any
    findOne(account_id: number): any
  //  findNick(email: string): any
}