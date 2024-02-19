export type TReturAuthorizated = {
    message: string,
}

export interface IAuthorizeTransfer {
    authorizeTransfer(payload: any): Promise<TReturAuthorizated>
}