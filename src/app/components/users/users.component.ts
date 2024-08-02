import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Users } from '../../interfaces/users';
import { AuthService } from '../../services/auth.service';
import { NgComponentOutlet } from '@angular/common';
import { UsersModalComponent as UserModal} from '../../modals/users/users.component';
import { ModalsService } from '../../services/modals.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
    users:Users[]=[];
    constructor(
      private authSvc:AuthService,
      private modalSvc:ModalsService,
      private viewContainer:ViewContainerRef
      ){
    
    }

    ngOnInit(): void {
      this.LoadUsers();
      this.modalSvc.close$.subscribe(_close=>{
        this.modalSvc.Close();
        this.LoadUsers();
      })
    }

    LoadUsers(){
      this.authSvc.GetUser({}).subscribe(_users=>{
        this.users=_users
      })
    }

    open(){
      this.modalSvc.Open(this.viewContainer,UserModal);
    }

    deleteUser(id:number|null){
      if(typeof id!=="number"){ return }
      this.authSvc.RemoveUser({user_id:id}).pipe(switchMap(_result=>{
        return this.authSvc.GetUser({})
      })).subscribe(_users=>{
        this.users=_users;
      })
    }

    editUser(user:Users){
      this.modalSvc.edit$.next(user);
      this.open();
    }
}
