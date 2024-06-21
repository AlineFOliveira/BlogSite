import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,} from '@angular/material/dialog';

import { Blog } from '../../../interfaces/blog';
import { BlogsService } from '../../../services/blogs/blogs.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';





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

  readonly dialog = inject(MatDialog);
  blogs: Blog[] =[]

  constructor(
    private blogsService: BlogsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { } //Injeta o serviço aqui, salva em blogsService

  

  ngOnInit(){
    this.loadBlogs();
    
  }

  loadBlogs(){
    this.blogsService.getBlogs().subscribe(blog => this.blogs = blog)//chama o getBLogs do serviço
    //o getBlogs retorna um observable, aqui, ele se inscreve no observável para receber os dados. É como se inscrever num evento caridoso para que quando ele acontecer, pode receber a cesta de lanche q quer kkk
  
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogBoxComponent);

    dialogRef.afterClosed().subscribe(result => {

      if(result){//se no dialog-box algum daqueles retornou true
        this.deletarBlog(id);
      }
      
    });
  }


  deletarBlog(id: number){
    this.blogsService.deleteBlog(id).subscribe(deletedBLog => {
      this.openSnackBar("Blog deletado com sucesso! Atualize a lista.", "Fechar");
      this.redirectSuccess();
    });

  }  displayedColumns = ['codigo', 'name', 'handle', 'user', 'actions'];
  
  redirectSuccess(){
    this.router.navigate(["/blogs"]);
  }
  openSnackBar(message: string, action: string) {//recebe os parâmetros
    this.snackBar.open(message, action, { //define a duração deles
      duration: 2000, 
    });
  }
}
