import { ICustomers } from "./customers";

export class InvoicesI{
    factura_id!:number;
    total!:number;
    customer_id!:ICustomers;
    created_at!:Date;
}