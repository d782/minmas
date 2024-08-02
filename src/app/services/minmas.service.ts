import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinmasService {
  url="http://localhost:3000/";
  constructor(
    private http:HttpClient
  ) { }


  post<T>(path:string,body:T):Observable<T>{
    const url=this.getFullUrl(path);
    return this.http.post<T>(url,body)
  }


  get<T>(path:string):Observable<T>{
    const url=this.getFullUrl(path);
    return this.http.get<T>(url)
  }

  patch<T>(path:string,body:T):Observable<T>{
    const url=this.getFullUrl(path);
    return this.http.patch<T>(url,body)
  }

  delete<T>(path:string,body:T):Observable<T>{
    const url=this.getFullUrl(path);
    return this.http.delete<T>(url,{body})
  }

  getFullUrl(path:string):string{
    return this.url+path
  }
}
