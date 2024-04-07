import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../interfaces/user.model';

//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { NgbdModalFocus } from './modal.component.ts';



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

users: User [] = [];


constructor(private httpClient: HttpClient,
 // private modalService: NgbModal
  
){}

  ngOnInit(): void {
    this.httpClient.get<User[]>('http://localhost:3000/users')
    .subscribe(users => this.users = users);
  }



  

  deleteById(id: string | number): void {
    const remove: boolean = confirm("¿Quiere eliminar este usuario de su lista?");
    if (!remove) return;

   /*  const modalRef = this.modalService.open(NgbdModalFocus);
    modalRef.componentInstance.open('autofocus'); */
    
    this.httpClient.delete<User>(`http://localhost:3000/users/${id}`)
      .subscribe(() => {

       this.users = this.users.filter(users => users.id !== id);
      });
  }

  
  }


