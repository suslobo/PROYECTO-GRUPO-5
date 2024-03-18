import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User | undefined;
  userService: any;

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.http.get<User>(`http://localhost:3000/users/${id}`).subscribe(user => this.user = user);
    });
  }

  deleteUser() {
    const remove = confirm("¿Quiere eliminar este usuario?");
    if (!remove || !this.user) return;

    this.userService.deleteById(this.user.id).subscribe(() => {
      // Navegar hacia la lista de usuarios después de eliminar
      this.router.navigate(['/usuarios']);
    });
  }
}
