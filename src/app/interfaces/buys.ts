import { InvoicesI } from "./invoices";
import { IProducts } from "./products";

export class IBuys{
    buy_id!:number;
    factura_id!:InvoicesI;
    quantity!:number;
    product_id!:IProducts;
    total!:number;
    unit!:number
}