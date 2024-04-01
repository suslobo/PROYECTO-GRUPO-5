import { Component, OnInit } from '@angular/core';
import { House } from '../interfaces/house.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { Rating } from '../interfaces/rating.model';
import { User } from '../interfaces/user.model';

@Component({
  selector: 'app-house-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink, NgbRating],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css'
})
export class HouseDetailComponent implements OnInit {

  house: House | undefined;
  user: User | undefined;
  ratings!: Rating[];


  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.http.get<House>(`http://localhost:3000/houses/${id}`).subscribe(house => this.house = house);
    }
    );
    
    this.http.get<Rating[]>("http://localhost:3000/rating").subscribe((ratings)=> this.ratings = ratings)
  }



}

