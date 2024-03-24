import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Booking } from '../interfaces/booking.model';
import { NgbAlert} from '@ng-bootstrap/ng-bootstrap';
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
  totalPrice = 0;
  people: number = 0;
  numPeople: number = 0;
  showConfirmMessage = false;
  booking: Booking | undefined;
  
 

  bookingForm = new FormGroup({
  
    entryDate: new FormControl(new Date()),
    departureDate: new FormControl(new Date()),
    // people: new FormControl(0, [Validators.min(1)]),
    cleaningService: new FormControl<boolean>(false),
    breakfast: new FormControl<boolean>(false),
    numPeople: new FormControl(0)
   
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

  calculatePrice(){

    let entryDate = this.bookingForm.get('entryDate')?.value;
    let departureDate = this.bookingForm.get('departureDate')?.value;
    
    

    if(!entryDate || !departureDate || !this.house || !this.house.price){
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

    

    const cleaningService = this.bookingForm.get('cleaningService')?.value;
    if(cleaningService)
    this.price += 30;

    const breakfast = this.bookingForm.get('breakfast')?.value;
    if(breakfast)
    this.price += 10;

    

  }

  save(): void {

    const booking: Booking = {
      id: this.bookingForm.get('id')?.value ?? 0,
      entryDate: this.bookingForm.get('entryDate')?.value ?? new Date(),
      departureDate: this.bookingForm.get('departureDate')?.value ?? new Date(),
      people: this.bookingForm.get('people')?.value ?? 0,
      price: this.price,
      house: this.house,
      //totalPrice: this.totalPrice
      
    };

    /* const id = this.bookingForm.get('id')?.value;
    console.log(id);

    const entryDate = this.bookingForm.get('entryDate')?.value;
    console.log(entryDate);

    const departureDate = this.bookingForm.get('departureDate')?.value;
    console.log(departureDate);

    const people =; this.bookingForm.get('people')?.value;
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