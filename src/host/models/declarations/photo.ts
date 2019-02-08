import * as Mongoose from 'mongoose';
import { CrudPluginStatics } from '@modules/mongoose-plugins/crud';
import { EP } from '@common/interfaces';
/**
 * This model represents photos fetched via FlickrAPI by tag #int20h and 
 * from the specified photoset.
 */
export interface PhotoData {
    title:     string;
    // id:        string;  // conflicts with Mongoose.Document.id 
    secret:    string;
    server:    string;
    farm:      number;
    tag:       boolean;
    photoset:  boolean;
    emotions:  EP.Emotion[];
}

export interface PhotoMethods {
    
}

export interface PhotoStatics {
    updateDatabase(this: PhotoModel): Promise<void>;

    // private:
    getEmotionsForPhotos(
        this: PhotoModel,
        photos: Iterable<EP.FlickrPhoto>
    ): AsyncIterableIterator<PhotoData>;
}

export interface PhotoDoc extends 
Mongoose.Document, 
PhotoData, 
PhotoMethods 
{}
export interface PhotoModel extends 
Mongoose.PaginateModel<PhotoDoc>, 
CrudPluginStatics<PhotoDoc>,
PhotoStatics
{}