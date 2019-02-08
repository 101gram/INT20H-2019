import Paginate from 'mongoose-paginate';
import _        from 'lodash';
import * as Mongoose from 'mongoose';
import * as Vts      from 'vee-type-safe';
import * as Config   from 'config';
import { CrudPlugin     } from '@modules/mongoose-plugins/crud';
import { FlickrAPI      } from '@modules/flickr-api';
import { FaceppAPI      } from '@modules/facepp-api';
import { EP } from '@common/interfaces';

import { 
    PhotoMethods, PhotoStatics, PhotoDoc, PhotoModel, PhotoData
} from        '@models/declarations/photo';
export * from '@models/declarations/photo';

const Flickr = new FlickrAPI(Config.Flickr.ApiKey);
const Facepp = new FaceppAPI(Config.FacePP.ApiKey, Config.FacePP.ApiSecret);

export const Schema = new Mongoose.Schema({
        title:     { type: String,   required: true },
        id:        { type: String,   required: true },
        secret:    { type: String,   required: true },
        server:    { type: String,   required: true },
        farm:      { type: Number,   required: true },
        tag:       { type: Boolean,  required: true, default: false }, 
        photoset:  { type: Boolean,  required: true, default: false }, 
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
        const photos = await Flickr.fetchAllUnited();
        const emotionsPhotos = new Array<PhotoData>();
        for await (const emotionPhoto of this.getEmotionsForPhotos(photos)) {
            emotionsPhotos.push(emotionPhoto);
        }
        await this.remove({});
        await this.insertMany(photos);
    },

    async * getEmotionsForPhotos(photos) {
        for (const photo of photos) {
            Vts.reinterpret<PhotoData>(photo).emotions = await Facepp.getFacesEmotions(
                EP.photoToUrl(photo)
            );
            yield Vts.reinterpret<PhotoData>(photo);
        }
    }

};

const Methods: PhotoMethods = {
};

Schema.statics = Statics;
Schema.methods = Methods;

// beware that plugins must come after assigning methods and statics to Schema
Schema.plugin(CrudPlugin);
Schema.plugin(Paginate);

export const Photo = Mongoose.model<PhotoDoc, PhotoModel>('Photo', Schema);


