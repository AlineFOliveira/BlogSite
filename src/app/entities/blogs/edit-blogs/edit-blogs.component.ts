import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import { BlogsService } from '../../../services/blogs/blogs.service';
import { Blog } from '../../../interfaces/blog';

@Component({
  selector: 'app-edit-blogs',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './edit-blogs.component.html',
  styleUrl: './edit-blogs.component.scss'
})
export class EditBlogsComponent {
  blogs: Blog | undefined; 

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogsService
  ){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');//pega o parametro que veio da url
    this.loadBlog(Number(id));//transforma em numero, chama o loadBlog e manda o id pra la
  }

  loadBlog(id: number) {
    this.blogService.getBlog(id).subscribe(blog => this.blogs = blog)
  }

}
