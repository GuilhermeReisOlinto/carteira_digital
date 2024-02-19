export type TPayload = {
    name: string;
    cpf_document: string;
    email: string;
    nick_name: string;
    password: string;
	account_id: string;
}

export type TReturnPayload = {
    createdAt: string;
    name: string;
    account_number: string;
    verifying_digit: string;
}
export interface IClient {
    headleClient(payload: TPayload): Promise<TReturnPayload>
}