import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink, NgbAlert],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {

  userEmail = '';
  isAdmin = false;
  bookings: Booking[] = [];
  showConfirmMessage = false;
  private modalService = inject(NgbModal);

  constructor(private httpClient: HttpClient, 
    private authService: AuthenticationService,) {

    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);

  }

  openModal(content: TemplateRef<any>, bookings: Booking) {
    const modalRef = this.modalService.open(content, {
      centered: true
    });

    modalRef.result.then(result => {
      if (result === 'Aceptar') {
        console.log('Ha pulsado boorrar reserva');
        this.deleteById(bookings);

      }
    });

  }


  ngOnInit(): void {

    this.httpClient.get<Booking[]>('http://localhost:3000/booking/filter-by-current-user')
      .subscribe(bookings => this.bookings = bookings);

   
  }

  /*   deleteById(id: string | number): void {
      const remove: boolean = confirm("¿Quiere eliminar esta reserva de su lista?");
      if (!remove) return;
      this.httpClient.delete<Booking>(`http://localhost:3000/booking/${id}`)
        .subscribe(() => {
  
         this.bookings = this.bookings.filter(booking => booking.id !== id);
        });
    } */

  deleteById(booking: Booking) {
    // const remove: boolean = confirm("¿Quiere eliminar esta reserva de su lista?");
    //if (!remove) return;
    this.httpClient.delete<Booking>('http://localhost:3000/booking/' + booking.id)
      .subscribe(() => {
        this.showConfirmMessage = true;
        this.bookings = this.bookings.filter(booking => booking.id !== booking.id);
      });
  }

}





