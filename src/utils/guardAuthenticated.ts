import { ResolverContext } from '..';

export default (context: ResolverContext): void => {
    if (!context.user) {
        throw new Error('This query/mutation requires you to be authenticated.');
    }
};
