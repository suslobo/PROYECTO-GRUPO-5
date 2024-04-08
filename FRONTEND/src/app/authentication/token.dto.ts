export interface Token{
token: string;
}

export interface DecodedToken {
    sub: number;
    //nickName: string;
    email: string;
    role: string;
    iat: number;
    exp: number;

}