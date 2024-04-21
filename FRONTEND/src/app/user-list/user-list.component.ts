import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../interfaces/user.model';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication.service';

//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { NgbdModalFocus } from './modal.component.ts';



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule, NgbAlert],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

users: User [] = [];
isAdmin = false;
showConfirmMessage = false;
private modalService = inject(NgbModal);

constructor(private httpClient: HttpClient, private authService: AuthenticationService){
  this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
}


openModal(content: TemplateRef<any>, users: User) {
  const modalRef = this.modalService.open(content, {
    centered: true
  });

  modalRef.result.then(result => {
    if (result === 'Aceptar'){
      console.log('Ha pulsado boorrar usuario');
      this.deleteById(users);
      
    }
  });
  
}
  ngOnInit(): void {
    this.httpClient.get<User[]>('http://localhost:3000/users')
    .subscribe(users => this.users = users);
  }

/*   deleteById(id: string | number): void {
    const remove: boolean = confirm("¿Quiere eliminar este usuario de su lista?");
    if (!remove) return;

   /*  const modalRef = this.modalService.open(NgbdModalFocus);
    modalRef.componentInstance.open('autofocus'); */
    
   /*  this.httpClient.delete<User>(`http://localhost:3000/users/${id}`)
      .subscribe(() => {

       this.users = this.users.filter(users => users.id !== id);
      });
  }  */
  deleteById(user: User){
    // const remove: boolean = confirm("¿Quiere eliminar esta reserva de su lista?");
     //if (!remove) return;
     this.httpClient.delete<User>('http://localhost:3000/users/' + user.id)
       .subscribe(() => {
        this.showConfirmMessage = true;
        this.users = this.users.filter(user => user.id !== user.id);
       });
   }

  
  }


