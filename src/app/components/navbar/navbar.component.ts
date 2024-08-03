import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit {

  constructor(
    private router:Router,
    private authSvc:AuthService
  ){
  }

  get DisabledButton(){
    return ["/","/sign-up"].includes(this.router.url)
  }
  
  ngOnInit(): void {
  }

  CloseSession(){
    this.authSvc.ClearSession();
    this.router.navigate([''])
  }
}
