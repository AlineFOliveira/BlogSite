import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';



import { BlogsService } from '../../../services/blogs/blogs.service';
import { Blog } from '../../../interfaces/blog';
import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../interfaces/users';

@Component({
  selector: 'app-edit-blogs',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, FormsModule],
  templateUrl: './edit-blogs.component.html',
  styleUrl: './edit-blogs.component.scss'
})
export class EditBlogsComponent {
  blog: Blog = {
    id: 0, name: '', handle: '', user: null
  };

  userSelected: Users[] = [];
  selected: String | any = "";

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
    this.blogService.getBlog(id).subscribe(blog => {this.blog = blog; this.selected = blog.user?.login});
  }

  loadUsers(){
    this.usersService.getUsers().subscribe(user => this.userSelected = user)
  }

  salvar(){
    console.log(this.blog)
    this.blogService.updateBlog(this.blog).subscribe(updatedBlog => { //chama a função snackbar e passa os paramentros
      this.openSnackBar('Blog editado com sucesso!', 'Fechar');
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

  get selectedUserId(){//é chamado quando o valor da seleção é lido 
    return this.blog.user?.id || null
  }

  set selectedUserId(value: number | null) {//quando o valor do select é alterado, esse setter é chamado
    const user = this.userSelected.find(user => user.id === value);//recebe o valor e procura na lista de user o user com o id correspondente
    if (user) {//se o const de cima for true, ele altera o array do this.blog.user
      this.blog.user = { id: user.id, login: user.login };//o id do this blog user vai corresponder ao user.id selecionado e ao login do user selecionado
    } else {
      this.blog.user = null;
    }
  }
}
