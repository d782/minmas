import { Injectable } from '@angular/core';
import { MinmasService } from './minmas.service';
import { InvoicesI } from '../interfaces/invoices';
import { IBuys } from '../interfaces/buys';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(
    private apiSvc:MinmasService
  ) { }

  GetInvoices(query:any){
    return this.apiSvc.post<InvoicesI[]>('invoices/findByFilter',query)
  }

  CreateInvoice(invoice:InvoicesI,buys:IBuys[]){
    return this.apiSvc.post<InvoicesI>('invoices/create',invoice).pipe(
      switchMap(_resp=>{
        buys=this.SetInvoiceIdOnBuys(_resp,buys);
        return this.apiSvc.post('buys/bulkData',buys)
      })
    )
  }

  Delete(query:any,buyQuery:any){
    return this.apiSvc.delete('invoices',query).pipe(switchMap(_resp=>{
      return this.apiSvc.delete('buys',buyQuery)
    }))
  }

  FindBuys(query:any){
    return this.apiSvc.post('buys/findByFilter',query)
  }

  SetInvoiceIdOnBuys(invoice:InvoicesI,buys:IBuys[]){
    for(const buy of buys){
      buy.factura_id=invoice;
    }
    return buys;
  }
}
