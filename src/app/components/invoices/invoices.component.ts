import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { InvoicesI } from '../../interfaces/invoices';
import { ModalsService } from '../../services/modals.service';
import { InvoiceModalComponent } from '../../modals/invoice-modal/invoice-modal.component';
import { InvoicesService } from '../../services/invoices.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit {
  invoices:InvoicesI[]=[];
  relations={
    relations: ['customer_id'],
  }


  constructor(
    private viewContainer:ViewContainerRef,
    private modalSvc:ModalsService,
    private invoiceSvc:InvoicesService
  ){

  }

  ngOnInit(): void {
    this.LoadInvoices();

    this.modalSvc.close$.pipe(switchMap(_resp=>{
      return this.invoiceSvc.GetInvoices({...this.relations})
    })).subscribe(invoices=>{
      this.invoices=invoices;
      this.modalSvc.Close();
    });
  }

  Open(){
    this.modalSvc.edit$.next(null);
    this.modalSvc.Open(this.viewContainer,InvoiceModalComponent);
  }


  deleteInvoice(id:number){
    this.invoiceSvc.Delete({factura_id:id},{factura_id:id}).pipe(switchMap(_resp=>{
      return this.invoiceSvc.GetInvoices({...this.relations})
    })).subscribe(invoices=>this.invoices=invoices);
  }

  editInvoice(invoice:InvoicesI){
    this.modalSvc.edit$.next(invoice);
    this.modalSvc.Open(this.viewContainer,InvoiceModalComponent);
  }

  LoadInvoices(){
    this.invoiceSvc.GetInvoices({...this.relations}).subscribe(invoices=>{
      this.invoices=invoices
    })
  }
}
