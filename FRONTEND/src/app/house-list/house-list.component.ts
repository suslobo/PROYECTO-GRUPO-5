import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { House } from '../interfaces/house.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, NgbRatingModule],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css',
  providers: [NgbRatingConfig]
})
export class HouseListComponent implements OnInit{

  houses: House [] = [];
  isAdmin = false;
  private modalService = inject(NgbModal);

  constructor(private httpClient: HttpClient, config: NgbRatingConfig,
    private authService: AuthenticationService) {
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    config.readonly = true;
    config.max = 5;
  }

  openModal(content: TemplateRef<any>, houses: House){
    const modalRef = this.modalService.open(content, {
      centered: true
    });
    modalRef.result.then(result => {
      if(result === 'Aceptar'){
        console.log('Ha pulsado borrar casa');
        this.deleteById(houses);
        
      }
    })
  }
  ngOnInit(): void {
    this.httpClient.get<House[]>('http://localhost:3000/houses')
    .subscribe(houses => this.houses = houses);
  }

  deleteById(house: House){
    // const remove: boolean = confirm("¿Quiere eliminar esta reserva de su lista?");
     //if (!remove) return;
     this.httpClient.delete<House>('http://localhost:3000/houses/' + house.id)
       .subscribe(() => {
 
        this.houses = this.houses.filter(house => house.id !== house.id);
       });
   }
  /*  deleteById(id: string | number): void {
    const remove: boolean = confirm("¿Quiere eliminar esta casa?");
    if (!remove) return;
    this.httpClient.delete<House>(`http://localhost:3000/houses/${id}`)
      .subscribe(() => {

        console.log('La casa ha sido eliminada');

       this.houses = this.houses.filter(house => house.id !== id);
      });
  } */


}

