import * as Mongoose from 'mongoose';
import { CrudPluginStatics } from '@modules/mongoose/plugins/crud';
import { EP } from '@common/interfaces';
/**
 * This model represents photos fetched via FlickrAPI by tag #int20h and 
 * from the specified photoset.
 */
export interface PhotoDataWithoutId {
    title:     string;
    // id:        string;  // conflicts with Mongoose.Document.id 
    secret:    string;
    server:    string;
    farm:      number;
    tag:       boolean;
    photoset:  boolean;
    datetaken: Date;
    emotions:  EP.Emotion[];
}
export interface PhotoData extends PhotoDataWithoutId {
    id: string;
}
export interface PhotoMethods {
    
}

export interface PhotoStatics {
    updateDatabase(this: PhotoModel): Promise<void>;
}

export interface PhotoDoc extends 
Mongoose.Document, 
PhotoDataWithoutId, 
PhotoMethods 
{}
export interface PhotoModel extends 
Mongoose.PaginateModel<PhotoDoc>, 
CrudPluginStatics<PhotoDoc>,
PhotoStatics
{}