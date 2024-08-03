import { Injectable } from '@angular/core';
import { MinmasService } from './minmas.service';
import { IProducts } from '../interfaces/products';
import { Observable } from 'rxjs';
import { IBuys } from '../interfaces/buys';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private apiSvc:MinmasService
  ) { }


  GetProducts(query:any){
    return this.apiSvc.post<IProducts[]>('products/findByFilter',query);
  }

  CreateProduct(product:IProducts):Observable<IProducts>{
    return this.apiSvc.post('products/create',product);
  }

  DeleteProducts(query:any){
    return this.apiSvc.delete('products',query);
  }

  bulkData(products:IProducts[]){
    return this.apiSvc.post<IProducts[]>('products/bulkData',products)
  }
}
