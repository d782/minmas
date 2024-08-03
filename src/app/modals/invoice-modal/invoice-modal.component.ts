import { Component, OnInit } from '@angular/core';
import { InvoicesI } from '../../interfaces/invoices';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalsService } from '../../services/modals.service';
import { CustomersService } from '../../services/customers.service';
import { ICustomers } from '../../interfaces/customers';
import { find, switchMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../interfaces/products';
import { IBuys } from '../../interfaces/buys';
import { InvoicesService } from '../../services/invoices.service';

@Component({
  selector: 'app-invoice-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './invoice-modal.component.html',
  styleUrl: './invoice-modal.component.scss'
})
export class InvoiceModalComponent implements OnInit{
  invoice=new InvoicesI();
  customers:ICustomers[]=[];
  products:IProducts[]=[];
  buys:IBuys[]=[];
  loading=false;
  errorProduct!:boolean;
  buyModel={
    buy_id:null,
    id:null,
    quantity:null,
    total:null
  };

  constructor(
    private modalSvc:ModalsService,
    private customerSvc:CustomersService,
    private productSvc:ProductsService,
    private invoiceSvc:InvoicesService
  ){
    this.setInvoice();
    this.getProducts();
    this.initFields();
  }

  ngOnInit(): void {
    this.modalSvc.edit$.subscribe(_resp=>{
      if(_resp){
        this.invoice=_resp;
        this.GetBuys();
      }
    })
  }

  close(){
    this.modalSvc.close$.next(true)
  }


  save(){
    this.loading=true;
    this.invoiceSvc.CreateInvoice(this.invoice,this.buys).pipe(switchMap(_resp=>{
      return this.productSvc.bulkData(this.products)
    })).subscribe({
      next:(_resp)=>this.close(),
      error:(err)=>console.error(err)
    })
  }


  initFields(){
    this.customerSvc.GetCustomers({}).subscribe(customers=>{
      this.customers=customers;
    })
  }

  setInvoice(){
    if(!this.invoice.created_at){
      this.invoice.created_at=new Date();
    }
    if(!this.invoice.total){
      this.invoice.total=0;
    }
  }

  updateCustomerInfo($event:any){
    const customer=this.customers.find(customer=>(customer.customer_id===parseInt($event.target.value)));
    if(customer){
      this.invoice.customer_id=customer;
    }
  }

  getProducts(){
    this.productSvc.GetProducts({}).subscribe(products=>{
      this.products=products
    })
  }

  cancelBuy(index:number){
    this.buys.splice(index,1);
  }

  addProduct(form:NgForm){
    const product=this.products.find(product=>(product.product_id==parseInt(this.buyModel.id)));
    const buy=new IBuys();
    buy.factura_id=this.invoice;
    buy.product_id=product;
    buy.quantity=this.buyModel.quantity;
    buy.total=this.buyModel.total;
    buy.unit=product.price;
    
    const indexBuys=this.buys.findIndex(buy=>(buy.product_id.product_id===product.product_id));

    if(!this.buyModel.buy_id && indexBuys>-1){
      this.buys[indexBuys].quantity=this.buys[indexBuys].quantity+buy.quantity;
      this.buys[indexBuys].total=this.buys[indexBuys].total+buy.total
    }else if(this.buyModel.id && indexBuys>-1){
      this.buys[indexBuys]={
        buy_id:this.buys[indexBuys].buy_id,
        ...buy
      };
    }else{
      this.buys.push(buy);
    }

    this.invoice.total=this.buys.map(buy=>buy.total).reduce((val,curr)=>(curr+=val));

    this.ResetBuyModel();
    form.reset();
  }

  setPrice($event:any){
    const qty=$event.target.value;
    const id=parseInt(this.buyModel.id as unknown as string);
    const productIndex=this.products.findIndex(product=>(product.product_id==id));
    if(productIndex>-1 && this.products[productIndex].quantity>parseInt(qty)){
      this.errorProduct=false;
      this.buyModel.total=parseInt(qty)*this.products[productIndex].price;
      this.products[productIndex].quantity-=parseInt(qty);
    }else{
      this.errorProduct=true;
    }
  }

  EditBuy(buy:IBuys){
    this.buyModel.buy_id=buy.factura_id;
    this.buyModel.id=buy.product_id.product_id;
    this.buyModel.quantity=buy.quantity;
    this.buyModel.total=buy.total;
  }

  ResetBuyModel(){
    this.buyModel.buy_id=null;
    this.buyModel.id=null;
    this.buyModel.quantity=null;
    this.buyModel.total=null;
  }

  GetBuys(){
    if(this.invoice && this.invoice.factura_id){
      this.invoiceSvc.FindBuys({relations:["product_id","factura_id"],where:{factura_id:this.invoice.factura_id}}).subscribe(buys=>{
        this.buys=buys;
      })
    }
  }
}
