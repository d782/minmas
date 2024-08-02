import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Users } from '../../interfaces/users';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserActive } from '../../interfaces/active.user';

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
  constructor(
    private authSvc:AuthService,
    private router:Router
  ){
    this.newUser=new Users();
  }


  saveUser(){
    
    this.newUser.enabled=UserActive.ACTIVE;
    
    this.authSvc.SaveUser(this.newUser).subscribe((resp)=>{
      if(resp){
        this.authSvc.user$.next(resp)
        this.router.navigate(['home'])
      }
    },
    (error)=>console.error(error)
    )
  }
}
