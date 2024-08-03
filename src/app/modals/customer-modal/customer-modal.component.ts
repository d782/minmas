import { Component, OnInit } from '@angular/core';
import { ICustomers } from '../../interfaces/customers';
import { ModalsService } from '../../services/modals.service';
import { CustomersService } from '../../services/customers.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './customer-modal.component.html',
  styleUrl: './customer-modal.component.scss'
})
export class CustomerModalComponent implements OnInit {
    user=new ICustomers();

    constructor(
      private modalSvc:ModalsService,
      private customersSvc:CustomersService
    ){

    }

    ngOnInit(): void {
      this.modalSvc.edit$.subscribe(_resp=>{
        if(_resp){
          this.user=_resp;
        }
      })
    }


    save(){
      this.customersSvc.Create(this.user).subscribe(_resp=>{
        this.close();
      })
    }

    close(){
      this.modalSvc.close$.next(true);
    }
}
