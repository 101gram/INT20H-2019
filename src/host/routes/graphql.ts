import * as _           from 'lodash';
import * as Vts         from 'vee-type-safe';
import * as Apollo      from 'apollo-server-express';
import * as Config      from 'config';
import * as GqlIsoDate  from 'graphql-iso-date';
import * as GqlSchema   from '@modules/graphql';
import { makeTypeMatcher } from '@modules/graphql/directives/type-matcher';
import { PhotoResolvers, PhotoQueryResolvers  } from '@models/photo/resolvers';

const QueryResolvers: GqlSchema.QueryResolvers.Resolvers = {
    ...PhotoQueryResolvers
    // add more query resolvers when having more models
};


export const apolloServer = new Apollo.ApolloServer({
    playground: true,
    typeDefs: Apollo.gql(Config.Gql.Schema),
    introspection: true,
    resolvers: {
        Query: QueryResolvers as Apollo.IResolverObject,
        Photo: PhotoResolvers as Apollo.IResolverObject,
        Date:  GqlIsoDate.GraphQLDateTime
    },
    schemaDirectives: {
        positiveInt:       makeTypeMatcher(Vts.isPositiveInteger),
        zeroOrPositiveInt: makeTypeMatcher(Vts.isZeroOrPositiveInteger)
    }
    /** 
     * // Add user to context, when using authenication.
     * 
     * context: async (
     *     args: { req: Express.Request, res: Express.Response }
     * ): Promise<GqlV1Params.ResolveContext> => ({
     *     user: await authenticate(args.req)
     * })
     */
});