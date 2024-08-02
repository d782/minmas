import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userName!:string|undefined;

  constructor(
    private router:Router,
    private authSvc:AuthService
  ){
    this.SetName()
  }

  get DisabledButton(){
    return ["/","/sign-up"].includes(this.router.url)
  }

  CloseSession(){
    this.userName=undefined;
    this.authSvc.ClearSession();
    this.router.navigate([''])
  }

  SetName(){
    const user=this.authSvc.LocalUser();
    this.userName=`Bienvenido ${user?.user_name} ${user?.surename}`;
  }
}
