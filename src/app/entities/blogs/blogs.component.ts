import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { Blog } from '../../interfaces/blog';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})

export class BlogsComponent {
  blogs: Blog[] = [
    {codigo: 1001, name: "Admin's blog", handle: "Admin", user: "admin"},
    {codigo: 1002, name: "User's blog", handle: "User", user: "user"}
  ];

  displayedColumns = ['codigo', 'name', 'handle', 'user'];
  

}
