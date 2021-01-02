export type Claims = {
    iss: string;
    sub: string;
    aud: string;
    exp: number;
    iat: number;
    auth_time: number;
    at_hash: string;
};
