import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../interfaces/booking.model';
import { NgbAlert, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { House } from '../interfaces/house.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule, NgbAlert, CurrencyPipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})

export class BookingFormComponent implements OnInit {

  house: House | undefined;
  price = 0;
  numDays = 0;
  showConfirmMessage = false;
  booking: Booking | undefined;
  
 

  bookingForm = new FormGroup({
    id: new FormControl(),
    entryDate: new FormControl(new Date()),
    //entryDate: new FormControl(new Date().toISOSString().slice(0,16))
    departureDate: new FormControl(new Date()),
    people: new FormControl(0, [Validators.min(1)]),
    destination: new FormControl(''),
    available: new FormControl(true),
    //category: new FormControl(),
    //topics: new FormControl([]),
    house: new FormControl (),
    totalPrice: new FormControl()
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
      .subscribe(booking => this.booking = booking);
    });
  }

  calculatePrice(){

    let departureDate = this.bookingForm.get('entryDate')?.value;
    let entryDate = this.bookingForm.get('departureDate')?.value;

    if(!entryDate || !departureDate || !this.house || !this.house.price){
      return;
    }

    entryDate = new Date(entryDate);
    departureDate = new Date(departureDate); 

    const diffMilliseconds = entryDate.getTime() - departureDate.getTime(); 

    if (diffMilliseconds <= 0) {
      return;
    }
    
    this.numDays = diffMilliseconds / (1000 * 60 * 60 * 24);
    this.price = this.numDays * this.house.price;

    /* const differenceInMs = departureDate.getTime() - entryDate.getTime();
    const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));  */
   
    //this.numDays = differenceInDays; 
     
    // paso 5 multiplicar precio noche por dias de diferencia  y sumar cualquier otro servicio extra
   /*  const precioTotal = differenceInDays * tarifaPorDia;
    return totalPrice; */

}

  save(): void {

    const booking: Booking = {
      id: this.bookingForm.get('id')?.value ?? 0,
      entryDate: this.bookingForm.get('entryDate')?.value ?? new Date(),
      departureDate: this.bookingForm.get('departureDate')?.value ?? new Date(),
      price: this.price,
      house: this.house
      
    };

    /* const id = this.bookingForm.get('id')?.value;
    console.log(id);

    const entryDate = this.bookingForm.get('entryDate')?.value;
    console.log(entryDate);

    const departureDate = this.bookingForm.get('departureDate')?.value;
    console.log(departureDate);

    const people = this.bookingForm.get('people')?.value;
    console.log(people);

    const destination = this.bookingForm.get('destination')?.value;
    console.log(destination);

    const available = this.bookingForm.get('available')?.value;
    console.log(available);

    const topics = this.bookingForm.get('topics')?.value;
    console.log(topics); */
  

    // enviar al backend con método POST
    this.httpClient.post<Booking>('http://localhost:3000/booking', booking)
    .subscribe(booking => {
      console.log(booking);
      this.showConfirmMessage = true;
      this.booking = booking;
  

  });
}



}