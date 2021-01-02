import axios from 'axios';

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
    rfid: 'string';
    field_of_study: string;
};

const getUserInfoFromOW = async (access_token: string): Promise<UserInfo> => {
    const resp = await axios.post('https://online.ntnu.no/openid/userinfo', null, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
        },
    });

    return resp.data as UserInfo;
};

export default getUserInfoFromOW;
