/*import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../interfaces/booking.model';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, NgbDatepickerModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  ngOnInit(): void {
    
  }

  bookForm = new FormGroup({
    id: new FormControl(),
    entryDate: new FormControl(new Date()),
    //entryDate: new FormControl(new Date().toISOSString().slice(0,16))
    departureDate: new FormControl(new Date()),
    people: new FormControl(0, [Validators.min(1)]),
    destination: new FormControl(''),
    available: new FormControl(true),
    category: new FormControl(),
    topics: new FormControl([]),
  });

  save(): void {

    const id = this.bookForm.get('id')?.value;
    console.log(id);

    const entryDate = this.bookForm.get('entryDate')?.value;
    console.log(entryDate);

    const departureDate = this.bookForm.get('departureDate')?.value;
    console.log(departureDate);

    const people = this.bookForm.get('people')?.value;
    console.log(people);

    const destination = this.bookForm.get('destination')?.value;
    console.log(destination);

    const available = this.bookForm.get('available')?.value;
    console.log(available);

    const topics = this.bookForm.get('topics')?.value;
    console.log(topics);

/*

*/

/*    const booking: Booking = {
      id: this.bookForm.get('id')?.value ?? 0,
      entryDate: this.bookForm.get('entryDate')?.value ?? new Date(),
      departureDate: this.bookForm.get('departureDate')?.value ?? new Date(),
      people: this.bookForm.get('people')?.value ?? 0,
      destination: this.bookForm.get('destination')?.value ?? 'default',
      available: this.bookForm.get('available')?.value ?? true,

    }  
  }

  calculatePrice() {
    let totalPrice = 0;



    return totalPrice;
  }


} */

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit{

  bookings: Booking | undefined;
  price = 0;

  bookingForm = new FormGroup({

    startDate: new FormControl<Date>(new Date()),
    endDate: new FormControl<Date>(new Date()),

  });

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) return;

      this.httpClient.get<Booking>('http://localhost:3000/booking/' + id)
      .subscribe(booking => this.bookings = booking);
    });
  }

  calculatePrice() {

    // calculo del precio total
    console.log("Calculando precio");
    this.price = 80;
  }
  save() {

  }

}
