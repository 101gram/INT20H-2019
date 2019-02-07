import _        from 'lodash';
import * as Vts from 'vee-type-safe';
import * as Network from '@modules/network';
import { EmotionsPhotos } from '@common/interfaces';

interface Face {
    attributes?: Vts.Maybe<{
        emotion: Vts.BasicObjectMap<EmotionsPhotos.Emotion, number>
    }>;
}

const FaceTD: Vts.TypeDescriptionOf<Face> = {
    attributes: Vts.optional({
        emotion: Vts.isOneOf(EmotionsPhotos.PossibleEmotions)
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
    constructor(
        private readonly api_key: string, 
        private readonly api_secret: string
    ) {}

    async getFacesEmotions(imageUrl: string){
        const { faces } = await Network.postFormDataAndGetJson<FaceppResponse>({
            endpoint: 'https://api-us.faceplusplus.com/facepp/v3/detect',
            formData: {
                'api_key':           this.api_key,
                'api_secret':        this.api_secret,
                'image_url':         imageUrl,
                'return_attributes': 'emotion'
            },
            jsonTypedescr: FaceappResponseTD
        });
        const emotions: string[] = [];
        for (const { attributes } of faces) {
            if (attributes != null) {
                const { emotion } = attributes;
                emotions.push(_.maxBy(
                    _.keys(emotion), key => emotion[key as keyof typeof emotion]
                )!);
            }
        }
        return emotions;
    }
}

