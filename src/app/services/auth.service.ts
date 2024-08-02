import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MinmasService } from './minmas.service';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$:Subject<Users>=new Subject();
  constructor(
    private apiSvc:MinmasService
  ) { }


  SaveUser(user:Users){
    this.SetSession(user);
    return this.apiSvc.post('users/create',user)
  }

  GetUser(query:any):Observable<Users[]>{
    return this.apiSvc.post('users/getByFilter',query)
  }

  SetSession(user:Users){
    localStorage.setItem('minmas',JSON.stringify(user));
  }

  ClearSession(){
    localStorage.removeItem('minmas')
  }

  isAuth():string|null{
    const auth=localStorage.getItem('minmas');
    return auth
  }

  LocalUser():Users|null{
    const auth=localStorage.getItem('minmas');
    if(auth){
      return JSON.parse(auth)
    }
    return null
  }

  RemoveUser(query:any){
    return this.apiSvc.delete('',query)
  }
}
