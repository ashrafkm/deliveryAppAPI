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


let checkPendingDeliveries = new CronJob('*/10 * * * * *', () => {
    checkForPendingDeliveries()
});

async function checkForPendingDeliveries() {
    const pendingDeleveries = await deliveryRequest.find({ status: 'pending' })
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
    for (const eachDelevery of pendingDeleveries) {
        // deliveryRequest.updateOne({_id:mongoose.Types.ObjectId(eachDelevery._id)},{driver:'asd'})
    }
}