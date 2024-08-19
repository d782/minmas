import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Session } from '../../interfaces/users';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login=new Session();
  errorSession=false;
  constructor(
    private router:Router,
    private authSvc:AuthService
  ){

  }


  Login(form:NgForm){
    this.authSvc.Login({
      where:{
        pwd:this.login.pwd,
        email:this.login.email
      }
    }).subscribe(resp=>{
      if(resp && resp.token){
        this.errorSession=false;
        this.authSvc.user$.next(resp.token);
        this.authSvc.SetSession(resp.token);
        this.router.navigate(["home"])
      }else{
        this.errorSession=true;
        form.reset();
      }
    },
    (error)=>{
      this.errorSession=true;
      console.error(error);
    }
    )
  }
}
