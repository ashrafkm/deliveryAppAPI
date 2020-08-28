import { Document, Model, model, Schema } from 'mongoose';
import { IDeliveryRequest } from '../interface/deliveryRequest';

export interface IDeliveryRequestModel extends IDeliveryRequest, Document {

}

export interface DRequestModelInterface extends Model<IDeliveryRequestModel> {

}

export let DeliveryRequestSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required.']
    },
    description: {
        type: String,
    },
    fromLocation: {
        type: String,
        required: [true, 'fromLocation is required.']
    },
    toLocation: {
        type: String,
        required: [true, 'toLocation is required.']
    },
    driver: {
        type: String,
        required: [true, 'driver is required.']
    },
    status: {
        type: String,
    },
    count: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

DeliveryRequestSchema.pre('save', function (this: IDeliveryRequestModel, next) {
    next();
});


export const deliveryRequest: DRequestModelInterface = model<IDeliveryRequestModel, DRequestModelInterface>('delivery_request', DeliveryRequestSchema, 'delivery_request');
