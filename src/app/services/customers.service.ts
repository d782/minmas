import { Injectable } from '@angular/core';
import { MinmasService } from './minmas.service';
import { ICustomers } from '../interfaces/customers';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private apiSvc:MinmasService
  ) { }

  GetCustomers(query:any){
    return this.apiSvc.post<ICustomers[]>('customers/findByFilter',query);
  }

  Create(customer:ICustomers){
    return this.apiSvc.post<ICustomers>('customers/create',customer);
  }

  Delete(query:any){
    return this.apiSvc.delete('',query);
  }
}
