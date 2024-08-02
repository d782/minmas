import {  ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  component!:ComponentRef<any>;
  public close$=new Subject();
  public edit$=new BehaviorSubject<any|null>(null);
  constructor(
    
  ) { }


  Open(viewContainer:ViewContainerRef,component:any){
    this.component=viewContainer.createComponent(component);
  }

  Close(){
    this.component.destroy();
  }
}
