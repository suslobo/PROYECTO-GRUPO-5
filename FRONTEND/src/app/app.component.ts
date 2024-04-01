import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HouseFormComponent } from './house-form/house-form.component';
import { FooterComponent } from './footer/footer.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserListComponent } from './user-list/user-list.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { HomeComponent } from './home/home.component';
import { HouseListComponent } from './house-list/house-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, HouseDetailComponent, HouseListComponent,
      NavbarComponent, HouseFormComponent, FooterComponent,
      BookingFormComponent, NotFoundComponent, UserListComponent, BookingListComponent,
      BookingDetailComponent, HomeComponent, LoginComponent, RegisterComponent, 
      UserDetailComponent, UserProfileComponent]
})
export class AppComponent {
  title = 'FRONTED';
}
