import * as Mongoose from 'mongoose';
import * as Vts from 'vee-type-safe';
import { IdNotFoundError, NotFoundError } from '@modules/errors/mongoose-plugins/crud';
import ObjectId = Mongoose.Types.ObjectId;

export interface CrudPluginStatics<TDoc extends Mongoose.Document> {
    tryDeleteById(this: Mongoose.Model<TDoc>, id: ObjectId): Promise<TDoc>;
    tryUpdateById(
        this:   Mongoose.Model<TDoc>,
        id:     ObjectId,
        update: Vts.BasicObject
    ): Promise<TDoc>;
    tryFindById(this: Mongoose.Model<TDoc>, id: ObjectId): Promise<TDoc>;
    tryFindOne(this:  Mongoose.Model<TDoc>, queryObj: Vts.BasicObject): Promise<TDoc>;
}

export function CrudPlugin<TDoc extends Mongoose.Document>(schema: Mongoose.Schema) {
    const pluginStatics: CrudPluginStatics<TDoc> = {
        async tryDeleteById(id: ObjectId) {
            const doc = await this.findById(id);
            if (!doc) {
                throw new IdNotFoundError(id);
            }
            return doc.remove();
        },
        async tryUpdateById(id, update) {
            const updatedDoc = await this.findByIdAndUpdate(
                id, update, { new: true }
            ).exec();
            if (!updatedDoc) {
                throw new IdNotFoundError(id);
            }
            return updatedDoc;
        },
        async tryFindById(id) {
            const doc = await this.findById(id);
            if (!doc) {
                throw new IdNotFoundError(id);
            }
            return doc;
        },
        async tryFindOne(queryObj) {
            const doc = await this.findOne(queryObj);
            if (!doc) {
                throw new NotFoundError;
            }
            return doc;
        }
    };
    // forced cast to a function map object
    // as typescript doesn't get it with a simple cast
    schema.static(Vts.reinterpret<Vts.BasicObject<Function>>(pluginStatics));
}
