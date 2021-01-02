import jwt from 'jsonwebtoken';

type TokenClaims = {
    sub: string;
};

const getUserID = async (token_id: string): Promise<string> => {
    const cert = process.env.PUBLIC_KEY || '';

    try {
        const token = jwt.verify(token_id, cert) as TokenClaims;
        return token.sub;
    } catch (err) {
        throw err.message;
    }
};

export default getUserID;
