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



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterLink, HouseDetailComponent,
      NavbarComponent, HouseFormComponent, FooterComponent,
      BookingFormComponent, NotFoundComponent, UserListComponent, BookingListComponent]
})
export class AppComponent {
  title = 'FRONTED';
}
