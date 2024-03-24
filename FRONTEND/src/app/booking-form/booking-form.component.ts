import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyPipe } from '@angular/common';
import { House } from '../interfaces/house.model';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule, NgbAlert, CurrencyPipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit{

  house: House |undefined;
  price = 0;
  numDays = 0;
  totalPrice = 0;

  numPeople: number = 0;

  showConfirmMessage = false;
  booking: Booking | undefined;


  bookingForm = new FormGroup({

    entryDate: new FormControl<Date>(new Date()),
    departureDate: new FormControl<Date>(new Date()),
    people: new FormControl(0, [Validators.min(1)]),
    cleaningService: new FormControl<boolean>(false)

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

      this.httpClient.get<House>('http://localhost:3000/houses/' + id)
      .subscribe(house => this.house = house);
    });
  }

  calculatePrice() {

    let entryDate = this.bookingForm.get('entryDate')?.value;
    let departureDate = this.bookingForm.get('departureDate')?.value;



    if(!entryDate ||  !departureDate || !this.house || !this.house.price){
      return;
    }

    entryDate = new Date(entryDate);
    departureDate = new Date(departureDate); 

    const diffMilliseconds = departureDate.getTime() - entryDate.getTime(); 

    if (diffMilliseconds <= 0) {
      return;
    }

    this.numDays = diffMilliseconds / (1000 * 60 * 60 * 24);
    this.price = this.numDays * this.house.price;

    const isPeople = this.bookingForm.get('people')?.value;
    const cleaningService = this.bookingForm.get('cleaningService')?.value;
    if(cleaningService)
    this.price += 30;
  }
  save() {

    const booking: Booking = {
      id: this.bookingForm.get('id')?.value ?? 0,
      entryDate: this.bookingForm.get('entryDate')?.value ?? new Date(),
      departureDate: this.bookingForm.get('departureDate')?.value ?? new Date(),
      people: this.bookingForm.get('people')?.value ?? 0,
      price: this.price,
      house: this.house,
      available: false
    };

    // enviar la backend con el método POST
  this.httpClient.post<Booking>('http://localhost:3000/booking', booking)
    .subscribe(booking => {
      console.log(booking);
      this.showConfirmMessage = true;
      this.booking = booking;

  });


}
}
