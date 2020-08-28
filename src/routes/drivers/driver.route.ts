import { logger } from '@/services';
import { NextFunction, Request, Response, } from 'express';
import { BaseRoute } from '../route';
const mongoose = require('mongoose');
import { first, isEmpty } from 'lodash';
import { Types } from 'mongoose';

import { Drivers } from '../../schema/drivers'



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
        this.router.put('/update/:id', this.acceptDelevery);
        this.router.put('/update/:id', this.rejectDelevery);
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
            const driverId = req.params.id
            const resp = await Drivers.updateOne({ _id: mongoose.Types.ObjectId(driverId) }, { $set: { status: 'accepted' } })
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
            const driverId = req.params.id
            const resp = await Drivers.updateOne({ _id: mongoose.Types.ObjectId(driverId) }, { $set: { status: 'rejected' } })
            res.json({
                status: 200,
                message: 'delevery accepted.',
                data: resp
            })
        } catch (error) {
            res.json(error)
        }
    }


}

