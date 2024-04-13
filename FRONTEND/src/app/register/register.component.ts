import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../interfaces/register.model';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user.model';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = this.fb.group({
    
    nickname: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]]
  },
  {validators: this.passwordConfirmValidator}
  );

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient,
  private router : Router) {}

    passwordConfirmValidator(control: AbstractControl){
      if(control.get('password')?.value === control.get('passwordConfirm')?.value){
        return null;
      } else {
        return {
          'confirmError': true
        }


      }
   
    }
   /*  checkEmail() {
    const email = this.registerForm.get('email')?.value;

    
    const emailExists = true;

    if (emailExists) {
      alert('¡Error! El correo electrónico ya existe.');
    } else {
      this.save();
    }
  } */
    

  save(){

    let register: Register = {
     nickname: this.registerForm.get('nickname')?.value ?? '',
      email: this.registerForm.get('email')?.value ?? '',
     // phone: this.registerForm.get('phone')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? ''
    };
    let url= 'http://localhost:3000/users/register';
    this.httpClient.post<User>(url, register)
    .subscribe({
      next: user => {
        console.log(user);
      this.router.navigate([`/user/${user.id}/profile`]);
      },
      error: error => {
        // aqui hacemos algo que mueste un alert rojo por antalla
        console.log(error);
        
      }
    });
    
  }
}

