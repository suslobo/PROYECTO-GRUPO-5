<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
=======
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../interfaces/user.model';
>>>>>>> main

@Component({
  selector: 'app-user-list',
  standalone: true,
<<<<<<< HEAD
  imports:[RouterLink, HttpClientModule],
=======
  imports: [RouterLink, HttpClientModule],
>>>>>>> main
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css' // Corrección en la propiedad styleUrls
})
export class UserListComponent implements OnInit {

<<<<<<< HEAD
  users: User[] = [];

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
      this.httpClient.get<User[]>('http://localhost:3000/users')
        .subscribe(users => this.users = users);
  }
  
  deleteById(id: string | number): void {
    const remove: boolean = confirm("¿Quiere borrar el usuario de verdad?");
=======
users: User [] = [];

constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.httpClient.get<User[]>('http://localhost:3000/users')
    .subscribe(users => this.users = users);
  }

  deleteById(id: string | number): void {
    const remove: boolean = confirm("¿Quiere eliminar este usuario de su lista?");
>>>>>>> main
    if (!remove) return;
    this.httpClient.delete<User>(`http://localhost:3000/users/${id}`)
      .subscribe(() => {

       this.users = this.users.filter(user => user.id !== id);
      });
  }
<<<<<<< HEAD

}

=======
  }

>>>>>>> main
