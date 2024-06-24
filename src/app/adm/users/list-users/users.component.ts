import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Users } from '../../../interfaces/users';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatTableModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: Users[] = [];
  length: number = 0;
  pageSize: number = 1;
  pageIndex = 0;
  pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 1, previousPageIndex: 0 };
  
  

  constructor(
    private usersService: UsersService,
    private datePipe: DatePipe
  ){}

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.usersService.getUsersPaginator(this.pageIndex, this.pageSize).subscribe(user => this.users = user)//toda vez que o evento dispara, quando altera algo no paginator, chama a busca de novo, para atualizar os valores mostrados

  }
  ngOnInit(){
    this.usersService.getUsersPaginator(this.pageIndex, this.pageSize).subscribe(user => this.users = user)
    this.usersService.getUsersTotal().subscribe(userTotal => this.length = userTotal)
  }

  altSituation(user: Users){
    console.log(user)
    user.activated = !user.activated;
    user.lastModifiedDate = new Date();
    this.usersService.updateActivateUser(user).subscribe(
      response => {
        console.log('Usuário atualizado com sucesso:', response);
      },
      error => {
        console.error('Erro ao atualizar usuário:', error);
      }
    );
  }
  displayedColumns = ['id', 'login', 'email', 'situacao', 'idioma', 'perfis', 'dataCriacao', 'quemModificou', 'dataModificacao', 'actions'];
}
