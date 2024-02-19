export type TPayload = {
    name: string;
    cpf_document: string;
    email: string;
    nick_name: string;
    password: string;
	account_id: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IClientRepository {
    create(payload: TPayload): any
    findOneDocumentCpf(cpf_document: string): any
    findNickName(email: string): any
    findOneByAccount(account_id: number): any
}