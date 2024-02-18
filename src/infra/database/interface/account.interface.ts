export interface IAccountRepository {
    create(payload): any
    findOne(account_id: number): any
    findOneByAccount(account_number: number): any
  //  findNick(email: string): any
}