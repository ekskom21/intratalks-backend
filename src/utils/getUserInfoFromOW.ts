import axios from 'axios';
import casual from 'casual';

export type UserInfo = {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    nickname: string;
    preferred_username: string;
    picture: string;
    member: boolean;
    staff: boolean;
    superuser: boolean;
    rfid: string;
    field_of_study: string;
};

const getUserInfoFromOW = async (access_token: string): Promise<UserInfo> => {
    if (process.env.MOCK !== 'false') {
        return {
            name: casual.full_name,
            given_name: casual.first_name,
            family_name: casual.last_name,
            field_of_study: casual.domain,
            member: casual.boolean,
            nickname: casual.name,
            picture: casual.url,
            preferred_username: casual.first_name,
            rfid: casual.card_number(),
            sub: casual.card_number(),
            staff: casual.boolean,
            superuser: casual.boolean,
        } as UserInfo;
    }

    const resp = await axios.post('https://online.ntnu.no/openid/userinfo', null, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
        },
    });

    return resp.data as UserInfo;
};

export default getUserInfoFromOW;
