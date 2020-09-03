import { logger } from '@/services';
import { NextFunction, Request, Response, } from 'express';
import { BaseRoute } from '../route';
const mongoose = require('mongoose');
import { first, isEmpty } from 'lodash';
import { Types } from 'mongoose';

import { deliveryRequest } from '../../schema/deliveryRequest'



/**
 * @api {get} /
 * @apiName DeliveryRequest
 * @apiGroup DeliveryRequest
 *
 * @apiSuccess {String} type Json Type.
 */
export class DeliveryRequestRoute extends BaseRoute {
    public static path = '/delivery-request';
    private static instance: DeliveryRequestRoute;

    /**
     * @class DeliveryRequestRoute
     * @constructor
     */
    private constructor() {
        super();
        this.saveDeliveryRequest = this.saveDeliveryRequest.bind(this);
        this.init();
    }

    static get router() {
        if (!DeliveryRequestRoute.instance) {
            DeliveryRequestRoute.instance = new DeliveryRequestRoute();
        }
        return DeliveryRequestRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[DeliveryRequestRoute] Creating DeliveryRequestRoute route.');

        // add index page route
        this.router.post('/create', this.saveDeliveryRequest);
        this.router.get('/list', this.list);
    }

    private async saveDeliveryRequest(req: any, res: Response, next: NextFunction) {
        try {
            req.body.status = 'pending'
            let deliveryRequestModel = new deliveryRequest(req.body);
            const resp = await deliveryRequestModel.save()
            res.json({
                status: 200,
                message: 'succesfully created!.',
                data: resp
            })
        } catch (error) {
            res.json(error)
        }
    }

    private async list(req: any, res: Response, next: NextFunction) {
        try {
            req.body.status = 'pending'
            // let deliveryRequestModel = new deliveryRequest();
            const resp = await deliveryRequest.aggregate([
                {
                    '$lookup': {
                        from: 'drivers',
                        let: { driverId: '$driver', },
                        pipeline: [
                            {
                                $addFields: {
                                    _id: {
                                        $convert: {
                                            input: '$_id',
                                            to: 'string',
                                            onError: 0
                                        }
                                    }
                                }
                            },
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$_id', '$$driverId']
                                            },
                                        ],
                                    }
                                }
                            }
                        ],
                        as: 'driver_details'
                    }
                },
                {
                    $project: {
                        name: 1,
                        description: 1,
                        fromLocation: 1,
                        toLocation: 1,
                        driver: { $arrayElemAt: ['$driver_details.name', 0] },
                        status: 1,
                    }
                }
            ])
            res.json({
                status: 200,
                data: resp
            })
        } catch (error) {
            res.json(error)
        }
    }


}

