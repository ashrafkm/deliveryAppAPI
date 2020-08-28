export interface IDeliveryRequest {
    name: string,
    description: string,
    fromLocation: string,
    toLocation: string,
    driver: string,
    status: string,
    count: number,
    createdAt: Date,
}