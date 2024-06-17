import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { Posts } from '../../interfaces/posts';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatTableModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  posts: Posts[] = [
    {codigo: 1001, title: "Post 1", content: "babababa", date: "11 jun 2024 09:55:00", blog: "Admin's Blog"},
    {codigo: 1002, title: "Post 2", content: "tomate", date: "11 jun 2024 09:55:00", blog: "User's Blog"},
  ];

  displayedColumns = ['codigo', 'title', 'content', 'date', 'blog', 'actions'];
}
