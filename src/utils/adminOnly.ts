import { ResolverContext } from '..';
import { environment } from '../API/configuration';

export default (context: ResolverContext): void => {
    const adminList = process.env.ADMIN_IDS?.split(',') ?? [];
    const userID = context.user?.claims.sub || '';

    if (!adminList.includes(userID) && !environment.apollo.mockEntireSchema) {
        throw Error('This query/mutation requires you to be an admin.');
    }
};
