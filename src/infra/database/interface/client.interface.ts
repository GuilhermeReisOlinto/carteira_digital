export interface IClientRepository {
    create(payload): any
    findOne(cpf_document: string): any
    findNick(email: string): any
}