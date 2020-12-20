import { MutationRefreshArgs, MutationSignInArgs, Tokens } from '../generated/graphql';
import axios from 'axios';
import FormData from 'form-data';

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
    },
};