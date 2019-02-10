import Express from 'express';
import _       from 'lodash';
import * as Vts    from 'vee-type-safe';
import * as VtsEx  from 'vee-type-safe/express';
import { EP    } from '@common/interfaces';
import { Photo } from '@models/photo';


interface EmotionsPhotosQueryParams {
    // stringified numbers
    offset:   string;  
    limit:    string;
    emotion?: string;
}
const EmotionsPhotosQueryParamsTD: Vts.TypeDescriptionOf<EmotionsPhotosQueryParams> = {
    offset:  'string',
    limit:   'string',
    emotion: Vts.optional('string')
};

export const router = Express.Router()
.get('/emotions/photos', 
    VtsEx.ensureTypeMatch(VtsEx.ReqQuery, EmotionsPhotosQueryParamsTD),
    async ({ query }: VtsEx.ReqQuery<EmotionsPhotosQueryParams>, res) => {
        const offset = parseInt(query.offset, 10);
        const limit  = parseInt(query.limit, 10);
        Vts.ensureMatch(offset, Vts.isZeroOrPositiveInteger);
        Vts.ensureMatch(limit,  Vts.isZeroOrPositiveInteger);
        const emotions = query.emotion ? query.emotion.split(',') : null;
        Vts.ensureMatch(emotions, Vts.isNullOr([Vts.isOneOf(EP.PossibleEmotions)]));

        const projection = _.mapValues(EP.PhotoTD, () => true);
        projection._id = false;

        const page = await Photo.paginate(
            emotions 
                ? { emotions: { $elemMatch: { $in: emotions } } }
                : {},
            { 
                offset, 
                limit, 
                lean: true, 
                leanWithId: false, 
                select: projection  
            }
        );
        res.json({
            total: page.total,
            data:  page.docs
        });
    });