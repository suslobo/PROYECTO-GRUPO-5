import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { House } from '../interfaces/house.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-house-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './house-form.component.html',
  styleUrl: './house-form.component.css'
})
export class HouseFormComponent implements OnInit{

  house: House | undefined;


  houseForm = new FormGroup({

    id: new FormControl(),
    title: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    places: new FormControl('', [Validators.min(2), Validators.max(20)]),
    bedrooms: new FormControl(0, [Validators.min(1), Validators.max(10)]),
    bathrooms: new FormControl(0, [Validators.min(1), Validators.max(10)]),
    price: new FormControl(0, [Validators.min(0), Validators.max(300)]),
    meters: new FormControl(0, [Validators.min(50), Validators.max(1000)]),
    destination: new FormControl('', Validators.required),
    petFriendly: new FormControl(false),
    pool: new FormControl(false),
    garden: new FormControl(false),
    terrace: new FormControl(false),
    wifi: new FormControl(false),
    air: new FormControl(false),
    description: new FormControl('', Validators.required),
    photoUrls: new FormControl<string[]>([])
  });

  isUpdate: boolean = false;
  isDelete: boolean = false;


   constructor (
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}


  ngOnInit(): void {

        this.activatedRoute.params.subscribe(params => {
          let id = params['id'];
          if (!id)
            return;

          this.httpClient.get<House>(`http://localhost:3000/houses/${id}`).subscribe(houses => {
            this.isUpdate = true

            this.houseForm.reset({
              id: houses.id,
              title: houses.title,
              address: houses.address,
              phone: houses.phone,
              email: houses.email,
              places: houses.places,
              bedrooms: houses.bedrooms,
              bathrooms: houses.bathrooms,
              price: houses.price,
              meters: houses.meters,
              destination: houses.destination,
              petFriendly: houses.petFriendly,
              pool: houses.pool,
              garden: houses.garden,
              terrace: houses.terrace,
              wifi: houses.wifi,
              air: houses.air,
              description: houses.description,
              photoUrls: houses.photoUrls
            });
          });

      });

      this.activatedRoute.params.subscribe(params =>{
        let id = params['id'];
        if (id)
        this.httpClient.get<House>(`http://localhost:3000/houses/${id}`).subscribe(houses => {
            this.isDelete = true
      });
      })

    }



  save(): void {

    console.log('invocando save');

    const house: House = {
      id: this.houseForm.get('id')?.value ?? 0,
      title: this.houseForm.get('title')?.value ?? '',
      address: this.houseForm.get('address')?.value ?? '',
      phone: this.houseForm.get('phone')?.value ?? '',
      email: this.houseForm.get('email')?. value ?? '',
      places: this.houseForm.get('places')?.value ?? '',
      bedrooms: this.houseForm.get('bedrooms')?.value ?? 0,
      bathrooms: this.houseForm.get('bathrooms')?.value ?? 0,
      price: this.houseForm.get('price')?.value ?? 0,
      meters: this.houseForm.get('meters')?.value ?? 0,
      destination: this.houseForm.get('destination')?.value ?? '',
      petFriendly: this.houseForm.get('petFriendly')?.value ?? false,
      pool: this.houseForm.get('pool')?.value ?? false,
      garden: this.houseForm.get('garden')?.value ?? false,
      terrace: this.houseForm.get('terrace')?.value ?? false,
      wifi: this.houseForm.get('wifi')?.value ?? false,
      air: this.houseForm.get('air')?.value ?? false,
      description: this.houseForm.get('description')?.value ?? '',
      photoUrls: this.houseForm.get('photourls')?.value ?? []
    }

    console.log(house);

       if(this.isUpdate){
      const urlForUpdate = 'http://localhost:3000/houses/' + house.id;
      this.httpClient.put<House>(urlForUpdate, house).subscribe(data => this.router.navigate(['/houses']));
    } else {
      const url = 'http://localhost:3000/houses';
        this.httpClient.post<House>(url, house).subscribe(data => this.router.navigate(['/houses']));
    }


  }
  
  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return o1 === o2;
    }
  }


}
