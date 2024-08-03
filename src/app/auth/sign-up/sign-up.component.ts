import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Users } from '../../interfaces/users';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserActive } from '../../interfaces/active.user';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  
  newUser!:Users;
  errors!:boolean;
  constructor(
    private authSvc:AuthService,
    private router:Router
  ){
    this.newUser=new Users();
  }


  saveUser(){
    
    this.newUser.enabled=UserActive.ACTIVE;
    
    this.authSvc.GetUser({
      where:{
        email:this.newUser.email
      }
    }).pipe(switchMap(_resp=>{
      if(_resp.length){
        return of(null)
      }
      return this.authSvc.SaveUser(this.newUser)
    })).subscribe((resp)=>{
      if(resp){
        this.errors=false;
        this.authSvc.user$.next(resp)
        this.router.navigate(['home'])
      }else{
        this.errors=true;
      }
    },
    (error)=>console.error(error)
    )
  }
}
