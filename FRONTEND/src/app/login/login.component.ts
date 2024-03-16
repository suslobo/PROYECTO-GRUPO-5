import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../interfaces/login.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router) {}

  save() {

    let login: Login = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? ''
    }

    // enviar por POST a backen con httpClient
    let url = 'http://localhost:3000/login';
    this. httpClient.post<Login>(url, login).subscribe(res => {console.log(res); // respuesta token JWT y lo guardaríamos en localStorage

    // redirigir hacia la home
    this.router.navigate(['/home']);
    });


  }

}
