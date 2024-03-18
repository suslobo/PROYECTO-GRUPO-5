import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../interfaces/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

users: User [] = [];

constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.httpClient.get<User[]>('http://localhost:3000/users')
    .subscribe(users => this.users = users);
  }

  deleteById(id: string | number): void {
    const remove: boolean = confirm("¿Quiere eliminar este usuario de su lista?");
    if (!remove) return;
    this.httpClient.delete<User>(`http://localhost:3000/users/${id}`)
      .subscribe(() => {

       this.users = this.users.filter(user => user.id !== id);
      });
  }
  }

