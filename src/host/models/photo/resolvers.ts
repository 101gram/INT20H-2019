import * as GqlSchema from '@modules/graphql';
import { PhotoPaginator } from '@models/photo';
import { Paginated } from '@modules/mongoose/utils/paginate';

export const PhotoResolvers: GqlSchema.PhotoResolvers.Resolvers = {
};

export const PhotoQueryResolvers: GqlSchema.QueryResolvers.Resolvers = {
    getPhotos: (_parent, { req }) => PhotoPaginator.paginate({
        ...req, sort: req.sort || { datetaken: 'desc' }
    }) as Promise<Paginated<GqlSchema.Photo>>
};