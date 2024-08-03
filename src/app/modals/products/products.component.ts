import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProducts } from '../../interfaces/products';
import { ModalsService } from '../../services/modals.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  product=new IProducts();

  constructor(
    private modalSvc:ModalsService,
    private productsSvc:ProductsService
    ){
    
  }
 ngOnInit(): void {
  this.modalSvc.edit$.subscribe((product)=>{
    if(product){
      this.product=product as IProducts
    }
  })
 }

  save(){
    this.product.created_at=new Date();
    this.productsSvc.CreateProduct(this.product).subscribe(_resp=>{
      if(_resp){
        this.close();
      }
    },
    (err)=>console.error(err)
    )
  }

  close(){
    this.modalSvc.close$.next(true);
  }
}
