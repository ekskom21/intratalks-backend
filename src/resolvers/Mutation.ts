import { Tokens } from '../generated/graphql';
import axios from 'axios';

export default {
    Mutation: {
        tokens: async (_: undefined, args: { code: string; is_refresh: boolean }): Promise<Tokens> => {
            try {
                const grant_type = args.is_refresh ? 'refresh_token' : 'authorization_code';
                const code_type = args.is_refresh ? '&refresh_token=' : '&code=';

                const response = axios.post(
                    'https://online.ntnu.no/openid/token',
                    'grant_type=' +
                        grant_type +
                        code_type +
                        args.code +
                        '&client_id=' +
                        process.env.CLIENT_ID +
                        '&client_secret=' +
                        process.env.CLIENT_SECRET +
                        '&redirect_uri=' +
                        process.env.REDIRECT_URI,
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
