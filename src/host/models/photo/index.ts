import Paginate from 'mongoose-paginate';
import _        from 'lodash';
import * as Mongoose  from 'mongoose';
import * as Vts       from 'vee-type-safe';
import * as Config    from 'config';
import { CrudPlugin } from '@modules/mongoose/plugins/crud';
import { FlickrAPI  } from '@modules/flickr-api';
import { FaceppAPI  } from '@modules/facepp-api';
import { EP         } from '@common/interfaces';
import { Paginator  } from '@modules/mongoose/utils/paginate';

import { 
    PhotoMethods, PhotoStatics, PhotoDoc, PhotoModel, PhotoData
} from        '@models/declarations/photo';
export * from '@models/declarations/photo';

const Flickr = new FlickrAPI(Config.Flickr.ApiKey);
const Facepps = Config.FacePP.APICredentials.map(
    cred => new FaceppAPI(cred.api_key, cred.api_secret)
);

export const Schema = new Mongoose.Schema({
        title:     { type: String,   required: true },
        id:        { type: String,   required: true },
        secret:    { type: String,   required: true },
        server:    { type: String,   required: true },
        farm:      { type: Number,   required: true },
        tag:       { type: Boolean,  required: true, default: false }, 
        photoset:  { type: Boolean,  required: true, default: false }, 
        datetaken: { type: Date,     required: true },
        emotions:  {
            type: [{ 
                type:     String,  
                required: true, 
                enum:     EP.PossibleEmotions
            }],
            required: true,
            index:    true
        }
    },
    { id: false }
);

const Statics: PhotoStatics = {
    async updateDatabase() {
                       // reuse already existing objects, add `emotions` field to them.
        const photos = Vts.reinterpret<PhotoData[]>(await Flickr.fetchAllUnited());
        const emotions = await Promise.all(photos.map(
            (photo, i) => Facepps[i % Facepps.length].getFacesEmotions(EP.photoToUrl(photo))
        ));
        emotions.forEach((emotion, i) => photos[i].emotions = emotion);
        await this.remove({});
        await this.insertMany(photos);
    },
};

const Methods: PhotoMethods = {
};

Schema.statics = Statics;
Schema.methods = Methods;

// beware that plugins must come after assigning methods and statics to Schema
Schema.plugin(CrudPlugin);
Schema.plugin(Paginate);

export const Photo = Mongoose.model<PhotoDoc, PhotoModel>('Photo', Schema);
export const PhotoPaginator = new Paginator<PhotoData, PhotoDoc>({ model: Photo });

