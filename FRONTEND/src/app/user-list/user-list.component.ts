import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'] // Corrección en la propiedad styleUrls
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>('http://localhost:3000/users')
      .subscribe(users => this.users = users);
  }

  deleteUser(id: number): void {
    // Mostrar una confirmación preguntando si se quiere borrar el usuario
    const remove: boolean = confirm("¿Quiere borrar el usuario de verdad?");

    if (!remove) return; // Si el usuario no confirma, no se borra
    
    // Aquí puedes implementar la lógica para borrar el usuario con el ID proporcionado
  }
}
