import { ResolverContext } from '..';

export default (context: ResolverContext): void => {
    if (!context.user && process.env.NODE_ENV !== 'development') {
        throw new Error('This query/mutation requires you to be authenticated.');
    }
};
