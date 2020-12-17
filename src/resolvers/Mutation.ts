import { MutationRefreshArgs, MutationSignInArgs, Tokens } from '../generated/graphql';
import axios from 'axios';
import qs from 'query-string';
import { envVariables } from '../index';

export default {
    Mutation: {
        signIn: async (_: undefined, args: MutationSignInArgs): Promise<Tokens> => {
            try {
                const body = {
                    grant_type: 'authorization_code',
                    code: args.code,
                    client_id: envVariables.CLIENT_ID || '',
                    client_secret: envVariables.CLIENT_SECRET || '',
                    redirect_uri: envVariables.REDIRECT_URI || '',
                };

                const response = axios.post(
                    'https://online.ntnu.no/openid/token',
                    qs.stringify(body, { encode: false }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                );

                const data: Tokens = (await response).data;

                return data;
            } catch (e) {
                throw new Error(e);
            }
        },

        refresh: async (_: undefined, args: MutationRefreshArgs): Promise<Tokens> => {
            try {
                const body = {
                    grant_type: 'refresh_token',
                    refresh_token: args.refresh_token,
                    client_id: envVariables.CLIENT_ID || '',
                    client_secret: envVariables.CLIENT_SECRET || '',
                    redirect_uri: envVariables.REDIRECT_URI || '',
                };

                const response = axios.post(
                    'https://online.ntnu.no/openid/token',
                    qs.stringify(body, { encode: false }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                );

                const data: Tokens = (await response).data;

                return data;
            } catch (e) {
                throw new Error(e);
            }
        },
    },
};
