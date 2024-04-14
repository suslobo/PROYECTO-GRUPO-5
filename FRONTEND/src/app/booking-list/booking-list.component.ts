import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit{

  userEmail = '';
  isAdmin = false;
  bookings: Booking [] = [];

  constructor(private httpClient: HttpClient, private authService: AuthenticationService){
    //this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);

  }

  ngOnInit(): void {

    this.httpClient.get<Booking[]>('http://localhost:3000/booking/filter-by-current-user')
    .subscribe(bookings => this.bookings = bookings); 

    /* 
    this.httpClient.get<Booking[]>(`http://localhost:3000/booking/filter-by-user/${this.userEmail}`)
    .subscribe(bookings => this.bookings = bookings); */
  
  }

  deleteById(id: string | number): void {
    const remove: boolean = confirm("¿Quiere eliminar esta reserva de su lista?");
    if (!remove) return;
    this.httpClient.delete<Booking>(`http://localhost:3000/booking/${id}`)
      .subscribe(() => {

       this.bookings = this.bookings.filter(booking => booking.id !== id);
      });
  }

}





