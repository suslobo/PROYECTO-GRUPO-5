import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../interfaces/booking.model';
import { NgbAlert, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { House } from '../interfaces/house.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgbDatepickerModule, HttpClientModule, NgbAlert, CurrencyPipe],
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
    category: new FormControl(),
    topics: new FormControl([]),
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

  save(): void {

    const id = this.bookingForm.get('id')?.value;
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
    console.log(topics);
  

    const reserva: Booking = {
      id: 0,
      entryDate: this.bookingForm.get('entryDate')?.value ?? new Date(),
      departureDate: this.bookingForm.get('departureDate')?.value ?? new Date(),
      totalPrice: this.price,
    
    };

    // enviar al backend con método POST
    this.httpClient.post<Booking>('http://localhost:3000/reservation', reserva)
    .subscribe(booking => {
      console.log(booking);
      this.showConfirmMessage = true;
      this.booking = booking;
  

  });
}

  calculatePrice(){
    let departureDate = new Date();
    let entryDate = new Date();

    if(!entryDate || !departureDate || !this.house || !this.house.price){
      return;
    }

    entryDate = new Date(entryDate);
    departureDate = new Date(departureDate);

    
    // let totalPrice = 0;
    // paso 1 obtener fecha inicio
     this.bookingForm.get('entryDate')?.value;

    // paso 2 obtener fecha fin
    this.bookingForm.get('departureDate')?.value;
    
    // paso 3 calcular la diferencia en días entre ambas fechas
    /* const differenceInMs = departureDate.getTime() - entryDate.getTime();
    const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24)); */
    const diffMilliseconds = entryDate.getTime() - departureDate.getTime();

    if (diffMilliseconds <= 0) {
      return;
    }

   this.price = this.numDays * this.house.price;
    // paso 5 multiplicar precio noche por dias de diferencia  y sumar cualquier otro servicio extra
   /*  const precioTotal = differenceInDays * tarifaPorDia;
    return totalPrice; */
    


}

}