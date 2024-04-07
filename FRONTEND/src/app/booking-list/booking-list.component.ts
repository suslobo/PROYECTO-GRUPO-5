import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit{

  userId: string = 'id_del_usuario_actual';
  bookings: Booking [] = [];

  constructor(private httpClient: HttpClient){}
  ngOnInit(): void {
    this.httpClient.get<Booking[]>(`http://localhost:3000/booking?userId=${this.userId}`)
    .subscribe(bookings => this.bookings = bookings);
   /*  this.httpClient.get<Booking[]>('http://localhost:3000/booking')
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

