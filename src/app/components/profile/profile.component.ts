import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Contact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  contact=new Contact();
  constructor(
    private readonly usersSvc:AuthService,
    private toastSvc:ToastrService
    ){

  }

  submit(form:NgForm){
    this.usersSvc.Contact(this.contact).subscribe(_resp=>{
      form.reset();
      this.contact=new Contact();
      this.toastSvc.success("Se ha enviado la información correctamente","Minmas informa :")
    })
  }
}
