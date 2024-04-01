import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {

  comments: Comment [] = [];

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
   this.httpClient.get<Comment[]>('http://localhost:3000/comments')
   .subscribe(comments => this.comments = comments)
  }

}
