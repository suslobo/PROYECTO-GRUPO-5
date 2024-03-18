import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports:[RouterLink, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css' // Corrección en la propiedad styleUrls
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
      this.httpClient.get<User[]>('http://localhost:3000/users')
        .subscribe(users => this.users = users);
  }
  
  deleteById(id: string | number): void {
    const remove: boolean = confirm("¿Quiere borrar el usuario de verdad?");
    if (!remove) return;
    this.httpClient.delete<User>(`http://localhost:3000/users/${id}`)
      .subscribe(() => {

       this.users = this.users.filter(user => user.id !== id);
      });
  }

}

