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
    create(payload: TPayload): Promise<TPayload>
    findOneDocumentCpf(cpf_document: string): Promise<TPayload>
    findNickName(email: string): Promise<TPayload>
    findOneByAccount(account_id: number): Promise<TPayload>
}