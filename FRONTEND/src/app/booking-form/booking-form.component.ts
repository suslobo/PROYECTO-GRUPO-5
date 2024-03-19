import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../interfaces/booking.model';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgbDatepickerModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {


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


  }

  calculatePrice(){
    let departureDate = new Date();
    let entryDate = new Date();

    
    let totalPrice = 0;
    // paso 1 obtener fecha inicio
    this.bookForm.get('entryDate')?.value;
    // paso 2 obtener fecha fin
    this.bookForm.get('departureDate')?.value;
    // paso 3 calcular la diferencia en días entre ambas fechas
    const differenceInMs = departureDate.getTime() - entryDate.getTime();
    const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));
    // paso 4 obtener el precio por noche
    const tarifaPorDia = 50;
    // paso 5 multiplicar precio noche por dias de diferencia  y sumar cualquier otro servicio extra
    const precioTotal = differenceInDays * tarifaPorDia;
    return totalPrice;
    }


}
