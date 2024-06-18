import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';


import { BlogsService } from '../../../services/blogs/blogs.service';
import { Blog } from '../../../interfaces/blog';
import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../interfaces/users';

@Component({
  selector: 'app-edit-blogs',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './edit-blogs.component.html',
  styleUrl: './edit-blogs.component.scss'
})
export class EditBlogsComponent {
  blog: Blog = {
    id: 0, name: '', handle: '', user: 0 
  };

  userSelected: Users[] = [];
  selected: String = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogsService,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ){}

  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');//pega o parametro que veio da url
    this.loadBlog(Number(id));//transforma em numero, chama o loadBlog e manda o id pra la
    this.loadUsers()
    
  }

  loadBlog(id: number) {
    this.blogService.getBlog(id).subscribe(blog => {this.blog = blog; this.selected = blog.user?.login;});
  }

  loadUsers(){
    this.usersService.getUsers().subscribe(user => this.userSelected = user)
  }

  salvar(){
    console.log(this.blog)
    this.blogService.updateBlog(this.blog).subscribe(updatedBlog => { //chama a função snackbar e passa os paramentros
      this.openSnackBar('Blog editado com sucesso', 'Fechar');
      this.redirectSuccess();
    })
    
  }

  openSnackBar(message: string, action: string) {//recebe os parâmetros
    this.snackBar.open(message, action, { //define a duração deles
      duration: 2000, 
    });
  }

  redirectSuccess(){
    this.router.navigate(['/blogs']); //'navega' para a rota blogs
  }

}
