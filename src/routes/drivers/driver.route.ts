import { logger } from '@/services';
import { NextFunction, Request, Response, } from 'express';
import { BaseRoute } from '../route';
const mongoose = require('mongoose');
import { first, isEmpty } from 'lodash';
import { Types } from 'mongoose';

import { Drivers } from '../../schema/drivers'
import { deliveryRequest } from '../../schema/deliveryRequest'



/**
 * @api {get} /
 * @apiName DeliveryRequest
 * @apiGroup DeliveryRequest
 *
 * @apiSuccess {String} type Json Type.
 */
export class DriverRoute extends BaseRoute {
    public static path = '/drivers';
    private static instance: DriverRoute;

    /**
     * @class DriverRoute
     * @constructor
     */
    private constructor() {
        super();
        this.init();
    }

    static get router() {
        if (!DriverRoute.instance) {
            DriverRoute.instance = new DriverRoute();
        }
        return DriverRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[DriverRoute] Creating jobs route.');

        // add index page route
        this.router.get('/list', this.list);
        this.router.put('/update/:id', this.update);
        this.router.put('/accept/:id', this.acceptDelevery);
        this.router.put('/reject/:id', this.rejectDelevery);
    }


    private async list(req: any, res: Response, next: NextFunction) {
        try {
            const resp = await Drivers.aggregate([
                { $match: {} }
            ])
            res.json({
                status: 200,
                data: resp
            })
        } catch (error) {
            res.json(error)
        }
    }

    private async update(req: any, res: Response, next: NextFunction) {
        try {
            const driverId = req.params.id
            delete req.body._id;
            delete req.body.createdAt;
            console.log('request 2: ', req.body);
            const resp = await Drivers.updateOne({ _id: mongoose.Types.ObjectId(driverId) }, { $set: req.body })
            res.json({
                status: 200,
                message: 'update successful!.',
                data: resp
            })
        } catch (error) {
            res.json(error)
        }
    }
    private async acceptDelevery(req: any, res: Response, next: NextFunction) {
        try {
            const deleveryId = req.params.id
            const resp = await deliveryRequest.updateOne({ _id: mongoose.Types.ObjectId(deleveryId) }, { $set: { status: 'accepted' } })
            res.json({
                status: 200,
                message: 'delevery accepted.',
                data: resp
            })
        } catch (error) {
            res.json(error)
        }
    }
    private async rejectDelevery(req: any, res: Response, next: NextFunction) {
        try {
            const deleveryId = req.params.id
            const data = await deliveryRequest.findOne({ _id: mongoose.Types.ObjectId(deleveryId) });
            console.log('data: ', data);
            let count: number;
            if (!data.count) {
                count = 0
            }
            if (data.count === 0 || data.count > 0) {
                count = data.count + 1
            }


            const resp = await deliveryRequest.updateOne({ _id: mongoose.Types.ObjectId(deleveryId) }, { $set: { status: 'rejected', count: count } })
            res.json({
                status: 200,
                message: 'delevery rejected.',
                data: resp
            })
        } catch (error) {
            res.json(error)
        }
    }


}

