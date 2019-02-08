import _        from 'lodash';
import * as Vts     from 'vee-type-safe';
import * as Config  from '@app/config';
import * as Utils   from '@modules/utils';
import * as Network from '@modules/network';
import { EP } from '@common/interfaces';

interface Face {
    attributes?: Vts.Maybe<{
        emotion: Vts.BasicObjectMap<EP.Emotion, number>
    }>;
}

const FaceTD: Vts.TypeDescriptionOf<Face> = {
    attributes: Vts.optional({
        emotion: EP.PossibleEmotions.reduce((obj, emotion) => {
            obj[emotion] = Vts.isNumberWithinRange(0, 100);
            return obj;
        }, {} as Vts.BasicObjectMap<EP.Emotion, Vts.TypePredicate>)
    })
};

interface FaceppResponse {
    faces:      Face[];
    image_id:   string;
    request_id: string;
    time_used:  number;
}
const FaceappResponseTD: Vts.TypeDescriptionOf<FaceppResponse> = {
    faces:      [FaceTD],
    image_id:   'string',
    request_id: 'string',
    time_used:  'number'
};

export class FaceppAPI {
    private lastQueryTime = -Infinity;
    private static readonly minDelay = 1000 / Config.FacePP.QueryPerSecond;

    constructor(
        private readonly api_key: string, 
        private readonly api_secret: string
    ) {}

    async getFacesEmotions(imageUrl: string){
        const sinceLastQuery = Date.now() - this.lastQueryTime;
        if (sinceLastQuery < FaceppAPI.minDelay) {
            await Utils.delay(FaceppAPI.minDelay - sinceLastQuery);
        }
        const { faces } = await Network.postFormDataAndGetJson<FaceppResponse>({
            endpoint: 'https://api-us.faceplusplus.com/facepp/v3/detect',
            formData: {
                api_key:           this.api_key,
                api_secret:        this.api_secret,
                image_url:         imageUrl,
                return_attributes: 'emotion'
            },
            jsonTypedescr: FaceappResponseTD
        });
        this.lastQueryTime = Date.now();
        const emotions: EP.Emotion[] = [];
        for (const { attributes } of faces) {
            if (attributes != null) {
                const { emotion } = attributes;
                emotions.push(_.maxBy(
                    _.keys(emotion) as (keyof typeof emotion)[], 
                    key => emotion[key as keyof typeof emotion]
                )!);
            }
        }
        return emotions;
    }
}

