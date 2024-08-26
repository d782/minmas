import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalsService } from '../../services/modals.service';
import { AuthService } from '../../services/auth.service';
import { Users } from '../../interfaces/users';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-users',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersModalComponent implements OnInit,AfterViewInit {
  @ViewChild("form") form!:NgForm;
  user=new Users();
  constructor(
    private modalSvc:ModalsService,
    private authSvc:AuthService,
    private toastSvc:ToastrService
  ){

  }

  ngOnInit(): void {
    this.modalSvc.edit$.subscribe((_user)=>{
      if(_user){
        this.user=_user as Users;
      }
    })
  }

  ngAfterViewInit(): void {
  }

  close(){
    this.modalSvc.close$.next(true);
  }

  save(){
    this.user.enabled=1;
    this.authSvc.SaveUser(this.user).subscribe(_resp=>{
      this.toastSvc.success("El usuario se ha creado correctamente","Minmas dice:");
      this.close();
    },
    (err)=>{console.error(err)})
  }
}
