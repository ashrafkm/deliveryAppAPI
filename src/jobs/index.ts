import { deliveryRequest } from "../schema/deliveryRequest";
import { Drivers } from "../schema/drivers";
const CronJob = require("cron").CronJob;
const mongoose = require('mongoose');

export const jobs = {
    init: () => {
        startJobs();
    }
};

const startJobs = () => {
    checkPendingDeliveries.start();
};

let checkPendingDeliveries = new CronJob('*/20 * * * * *', () => {
    checkForPendingDeliveries()
});

async function checkForPendingDeliveries() {
    const pendingDeleveries = await deliveryRequest.find({ status: { $in: ['pending', 'rejected'] } })
    const availableDrivers = await getAvailableDrivers(pendingDeleveries)
    setDriverForPendingDeleveries(pendingDeleveries, availableDrivers)
}

async function getAvailableDrivers(deleveries: Array<any>) {
    try {
        const availableDrivers = await Drivers.find({ availability: { $ne: false } })
        const unAssignedDrivers = availableDrivers.filter((e) => !deleveries.find((r) => String(e._id) === String(r.driver)));
        return unAssignedDrivers;
    } catch (error) {
        console.log('err: ', error);
    }
}

async function setDriverForPendingDeleveries(pendingDeleveries: Array<any>, availableDrivers: Array<any>) {
    let drivers = availableDrivers;
    for (const eachDelevery of pendingDeleveries) {
        if (eachDelevery.count && eachDelevery.count > 2) {
            deliveryRequest.updateOne({ _id: mongoose.Types.ObjectId(eachDelevery._id) }, { $set: { status: 'rejected' } })
        } else {
            if (drivers.length > 0) {
                const driver = drivers.pop();
                deliveryRequest.updateOne({ _id: mongoose.Types.ObjectId(eachDelevery._id) }, { $set: { driver: driver._id } })
            }
        }
    }
}