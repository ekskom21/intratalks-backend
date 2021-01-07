import { ResolverContext } from '..';

export default (context: ResolverContext): void => {
    const adminList = process.env.ADMIN_IDS?.split(',') ?? [];
    const userID = context.user?.claims.sub ?? '';

    if (!adminList.includes(userID) && process.env.NODE_ENV !== 'development') {
        throw Error('This query/mutation requires you to be an admin.');
    }
};
