import {
    MutationRefreshArgs,
    MutationSignInArgs,
    MutationUserRegisteredArgs,
    Tokens,
    RegistrationState,
} from '../generated/graphql';
import axios from 'axios';
import FormData from 'form-data';

type AttendanceEventType = {
    is_attendee: boolean;
    is_on_waitlist: boolean;
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

        userRegistered: async (_: unknown, args: MutationUserRegisteredArgs): Promise<RegistrationState> => {
            try {
                // You can set the event ID in the .env file.
                const eventId = process.env.EVENT_ID;

                const response = axios.get(`https://online.ntnu.no/api/v1/event/attendance-events/${eventId}/`, {
                    headers: {
                        Authorization: 'Bearer ' + args.access_token,
                        Accept: 'application/json',
                    },
                });

                const data: AttendanceEventType = (await response).data;

                if (data.is_on_waitlist) {
                    return RegistrationState.WaitList;
                }

                return RegistrationState.Registered;
            } catch (e) {
                // The request will return a 404 if the user is not on the attendence list.
                return RegistrationState.NotRegistered;
            }
        },
    },
};
