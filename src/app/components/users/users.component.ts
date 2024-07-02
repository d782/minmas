import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
    users=[
      {
        name:"Diego",
        lastname:"Cano",
        email:"z@gmail.com",
        document:"10450056",
        phone:123-45-6,
        address:"Calle 58"
      },
      {
        name:"Juana",
        lastname:"Gonzales",
        email:"z@gmail.com",
        document:"10450056",
        phone:123-45-6,
        address:"Calle 58"
      },
      {
        name:"Carlos",
        lastname:"Henao",
        email:"z@gmail.com",
        document:"10450056",
        phone:123-45-6,
        address:"Calle 58"
      }
    ]
}
