import axios from 'axios';
import { RegistrationState } from '../generated/graphql';

type AttendanceEvent = {
    is_attendee: boolean;
    is_on_waitlist: boolean;
};

const userRegistered = async (access_token: string): Promise<RegistrationState> => {
    try {
        // You can set the event ID in the .env file.
        const eventId = process.env.EVENT_ID;

        const response = axios.get(`https://online.ntnu.no/api/v1/event/attendance-events/${eventId}/`, {
            headers: {
                Authorization: 'Bearer ' + access_token,
                Accept: 'application/json',
            },
        });

        const data: AttendanceEvent = (await response).data;

        if (data.is_on_waitlist) {
            return RegistrationState.WaitList;
        }

        return RegistrationState.Registered;
    } catch (e) {
        // The request will return a 404 if the user is not on the attendence list.
        return RegistrationState.NotRegistered;
    }
};

export default userRegistered;
