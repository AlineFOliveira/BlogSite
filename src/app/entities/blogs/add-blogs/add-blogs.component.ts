import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

import { BlogsService } from '../../../services/blogs/blogs.service';
import { Blog, newBlog } from '../../../interfaces/blog';
import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../interfaces/users';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-add-blogs',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, FormsModule, RouterModule],
  templateUrl: './add-blogs.component.html',
  styleUrl: './add-blogs.component.scss'
})
export class AddBlogsComponent {

  blog: newBlog = {
    id: null, name: '', handle: '', user: null
  }
  users: Users[] =[];

  
  
  constructor(
    private blogsService: BlogsService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router,

  ){}

  
  ngOnInit(){
    this.loadUsers() 
  }

  loadUsers(){
    this.usersService.getUsers().subscribe(user => this.users = user)
  }

  salvar(){
    console.log(this.blog)
    this.blogsService.createBlog(this.blog).subscribe(createdBlog => {
      this.openSnackBar("Blog criado com sucesso!", "Fechar");
      this.redirectSuccess();
    });
  }

  openSnackBar(message: string, action: string) {//recebe os parâmetros
    this.snackBar.open(message, action, { //define a duração deles
      duration: 2000, 
    });
  }
  redirectSuccess(){
    this.router.navigate(['/blogs']);
  }
  
  get selectedUserId(){//é chamado quando o valor da seleção é lido 
    return this.blog.user?.id || null
  }

  set selectedUserId(value: number | null) {//quando o valor do select é alterado, esse setter é chamado
    const user = this.users.find(user => user.id === value);//recebe o valor e procura na lista de user o user com o id correspondente
    if (user) {//se o const de cima for true, ele altera o array do this.blog.user
      this.blog.user = { id: user.id, login: user.login };//o id do this blog user vai corresponder ao user.id selecionado e ao login do user selecionado
    } else {
      this.blog.user = null;
    }
  }



}
