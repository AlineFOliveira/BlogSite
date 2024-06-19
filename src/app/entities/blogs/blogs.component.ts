import { Component, OnInit } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { Blog } from '../../interfaces/blog';
import { BlogsService } from '../../services/blogs/blogs.service';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})

export class BlogsComponent {
  // blogs: Blog[] = [
  //   {codigo: 1001, name: "Admin's blog", handle: "Admin", user: "admin"},
  //   {codigo: 1002, name: "User's blog", handle: "User", user: "user"}
  // ];

  constructor(private blogsService: BlogsService) { } //Injeta o serviço aqui, salva em blogsService

  
  blogs: Blog[] =[]

  ngOnInit(){
    
    this.blogsService.getBlogs().subscribe(blog => this.blogs = blog)//chama o getBLogs do serviço
    //o getBlogs retorna um observable, aqui, ele se inscreve no observável para receber os dados. É como se inscrever num evento caridoso para que quando ele acontecer, pode receber a cesta de lanche q quer kkk
  
  }

  displayedColumns = ['codigo', 'name', 'handle', 'user', 'actions'];
  

}
