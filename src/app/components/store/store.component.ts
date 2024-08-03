import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IProducts } from '../../interfaces/products';
import { ProductsService } from '../../services/products.service';
import { ModalsService } from '../../services/modals.service';
import { ProductsComponent } from '../../modals/products/products.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit {
    products:IProducts[]=[];

    constructor(
      private productsSvc:ProductsService,
      private modalSvc:ModalsService,
      private viewContainer:ViewContainerRef
      ){

    }

    ngOnInit(): void {
      this.LoadProducts();
      this.modalSvc.close$.subscribe(_resp=>{
        this.modalSvc.Close();
        this.LoadProducts();
      })
    }


    editProduct(product:IProducts){
      this.modalSvc.edit$.next(product);
      this.modalSvc.Open(this.viewContainer,ProductsComponent);
    }

    deleteProduct(id:number){
      this.productsSvc.DeleteProducts({product_id:id}).pipe(switchMap(_resp=>{
        return this.productsSvc.GetProducts({})
      })).subscribe(products=>{
        this.products=products;
      })
    }

    Open(){
      this.modalSvc.edit$.next(null);
      this.modalSvc.Open(this.viewContainer,ProductsComponent);
    }

    LoadProducts(){
      this.productsSvc.GetProducts({}).subscribe(products=>{
        this.products=products
      })
    }
}
