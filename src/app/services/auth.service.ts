import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MinmasService } from './minmas.service';
import { Users } from '../interfaces/users';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$:Subject<string>=new Subject();
  constructor(
    private apiSvc:MinmasService
  ) { }


  SaveUser(user:Users){
    return this.apiSvc.post('users/create',user)
  }

  GetUser(query:any):Observable<Users[]>{
    return this.apiSvc.post('users/getByFilter',query)
  }

  Login(query:any):Observable<{token:string}>{
    return this.apiSvc.post('users/login',query)
  }

  SetSession(token:string){
    localStorage.setItem('minmas',token);
  }

  ClearSession(){
    localStorage.removeItem('minmas')
  }

  isAuth():string|null{
    const auth=localStorage.getItem('minmas');
    return auth
  }

  LocalUser():string|null{
    const auth=localStorage.getItem('minmas');
    if(auth){
      return auth
    }
    return null
  }

  RemoveUser(query:any){
    return this.apiSvc.delete('users',query)
  }

  Contact(contact:Contact){
    return this.apiSvc.post('users/contact',contact)
  }
}
