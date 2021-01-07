import {
    MutationRefreshArgs,
    MutationSignInArgs,
    MutationRegisterInterestArgs,
    MutationRegisterAttendenceArgs,
    Tokens,
    EventTime,
} from '../generated/graphql';
import axios from 'axios';
import FormData from 'form-data';
import { ResolverContext } from '..';
import guardAuthenticated from '../utils/guardAuthenticated';
import adminOnly from '../utils/adminOnly';
import { Document } from 'mongoose';
import { registerInTime } from '../utils/time';

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

        registerInterest: async (
            _: unknown,
            { event_id }: MutationRegisterInterestArgs,
            context: ResolverContext,
        ): Promise<Document> => {
            guardAuthenticated(context);

            const event = await context.models.Event.findById(event_id).exec();

            if (!event) {
                throw new Error('That event does not exist.');
            }

            const time: EventTime = event.get('time');

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const interest = await context.models.Interest.findOne({ user_id: context.user!.claims.sub });

            if (interest) {
                await interest.updateOne({ [time.toLowerCase()]: event._id });
                return event;
            }

            await new context.models.Interest({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                user_id: context.user!.claims.sub,
                breakfast: null,
                lunch: null,
                dinner: null,
                [time.toLowerCase()]: event._id,
            }).save();

            return event;
        },

        registerAttendence: async (
            _: unknown,
            args: MutationRegisterAttendenceArgs,
            context: ResolverContext,
        ): Promise<Document> => {
            guardAuthenticated(context);
            adminOnly(context);

            const event = await context.models.Event.findById(args.event_id);

            if (!event) {
                throw new Error('That event does not exist.');
            }

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            registerInTime(event!.get('time'));

            const assignedEvent = await context.models.Assigned.findOne(
                { user_id: args.user_id },
                { $or: [{ breakfast: args.event_id }, { lunch: args.event_id }, { dinner: args.event_id }] },
            );

            if (!assignedEvent) {
                throw new Error('User is not registered for this event.');
            }

            await new context.models.Attended({
                user_id: args.user_id,
                event_id: args.event_id,
            }).save();

            return event;
        },
    },
};
