import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ICustomers } from '../../interfaces/customers';
import { CustomersService } from '../../services/customers.service';
import { ModalsService } from '../../services/modals.service';
import { switchMap } from 'rxjs';
import { CustomerModalComponent } from '../../modals/customer-modal/customer-modal.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  users:ICustomers[]=[];

  constructor(
    private customerSvc:CustomersService,
    private viewContainer:ViewContainerRef,
    private modalSvc:ModalsService
  ){

  }

  ngOnInit(): void {
    this.LoadCustomers();
    this.modalSvc.close$.pipe(switchMap(_close=>{
      return this.customerSvc.GetCustomers({})
    })).subscribe(customers=>{
      this.users=customers;
      this.modalSvc.Close();
    })
  }

  LoadCustomers(){
    this.customerSvc.GetCustomers({}).subscribe(customers=>{
      this.users=customers
    })
  }

  open(){
    this.modalSvc.edit$.next(null);
    this.modalSvc.Open(this.viewContainer,CustomerModalComponent);
  }

  editUser(customer:ICustomers){
    this.modalSvc.edit$.next(customer);
    this.modalSvc.Open(this.viewContainer,CustomerModalComponent);
  }

  deleteUser(id:number){
    this.customerSvc.Delete({customer_id:id}).pipe(switchMap(_resp=>{
      return this.customerSvc.GetCustomers({})
    })).subscribe(customers=>this.users=customers)
  }
}
