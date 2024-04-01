import { Component, OnInit } from '@angular/core';
import { Booking } from '../interfaces/booking.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent implements OnInit {

  booking: Booking | undefined;

  constructor (private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.httpClient.get<Booking>(`http://localhost:3001/booking/${id}`)
      .subscribe(booking => this.booking = booking);
    })
  }

}

