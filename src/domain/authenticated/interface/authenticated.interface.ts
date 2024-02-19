export type TAuthenticated = {
    email: string;
    password: string;
}

export type TReturnAuthenticated = {
    access_token: string;
}

export interface IAuthenticated {
    signIn(payload: TAuthenticated): any
}