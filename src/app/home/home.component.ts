import { Component, OnInit } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Posts } from '../interfaces/posts';
import { PostsService } from '../services/posts/posts.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  posts: Posts[] = [];
  
  constructor(private postsService: PostsService){}

  ngOnInit(){
    this.postsService.getPosts().subscribe(post => this.posts = post)
  }
}
