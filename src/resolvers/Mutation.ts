import { MutationRefreshArgs, MutationSignInArgs, MutationGetUserIdArgs, Tokens } from '../generated/graphql';
import axios from 'axios';
import FormData from 'form-data';
import jwt from 'jsonwebtoken';

type TokenPayloadType = {
    sub: string;
};

const getRequestBody = (grant_type: 'authorization_code' | 'refresh_token', payload: string) => {
    const body = new FormData();
    body.append('grant_type', grant_type);
    body.append(grant_type === 'authorization_code' ? 'code' : 'refresh_token', payload);
    body.append('client_id', process.env.CLIENT_ID);
    body.append('client_secret', process.env.CLIENT_SECRET);
    body.append('redirect_uri', process.env.REDIRECT_URI);

    return body;
};

export default {
    Mutation: {
        signIn: async (_: unknown, args: MutationSignInArgs): Promise<Tokens> => {
            const requestBody = getRequestBody('authorization_code', args.code);

            const response = axios.post('https://online.ntnu.no/openid/token', requestBody, {
                headers: requestBody.getHeaders(),
            });

            const data: Tokens = (await response).data;

            return data;
        },

        refresh: async (_: unknown, args: MutationRefreshArgs): Promise<Tokens> => {
            const requestBody = getRequestBody('refresh_token', args.refresh_token);

            const response = axios.post('https://online.ntnu.no/openid/token', requestBody, {
                headers: requestBody.getHeaders(),
            });

            const data: Tokens = (await response).data;

            return data;
        },

        getUserID: async (_: unknown, args: MutationGetUserIdArgs): Promise<string> => {
            const cert = process.env.PUBLIC_KEY || '';
            console.log(cert);
            try {
                const decoded = jwt.verify(args.token, cert);
                return (decoded as TokenPayloadType).sub;
            } catch (err) {
                return Promise.reject(err.message);
            }
        },
    },
};
