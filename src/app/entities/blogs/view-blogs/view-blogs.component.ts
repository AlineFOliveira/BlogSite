import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { HttpClient } from '@angular/common/http';

import { BlogsService } from '../../../services/blogs/blogs.service';
import { Blog } from '../../../interfaces/blog';

@Component({
  selector: 'app-view-blogs',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './view-blogs.component.html',
  styleUrl: './view-blogs.component.scss'
})
export class ViewBlogsComponent {
  blog: Blog | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService
  ){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');//pega o parametro que veio da url
    console.log(this.loadBlog(Number(id)));//transforma em numero, chama o loadBlog e manda o codigo pra la
  }

  loadBlog(id: number) {
    this.blogService.getBlog(id).subscribe(blog => this.blog = blog);
  }
}
