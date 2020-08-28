import { Document, Model, model, Schema } from 'mongoose';
import { IDrivers } from '../interface/drivers';

export interface IDriversModel extends IDrivers, Document {

}

export interface DriversModelInterface extends Model<IDriversModel> {

}

export let DriversSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required.']
    },
    availability: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

DriversSchema.pre('save', function (this: IDriversModel, next) {
    next();
});


export const Drivers: DriversModelInterface = model<IDriversModel, DriversModelInterface>('drivers', DriversSchema, 'drivers');
