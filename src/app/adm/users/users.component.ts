import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Users } from '../../interfaces/users';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatTableModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: Users[] = [];

  constructor(private usersService: UsersService){}

  ngOnInit(){
    this.usersService.getUsers(0, 1).subscribe(user => this.users = user)
  }

  displayedColumns = ['id', 'login', 'email', 'situacao', 'idioma', 'perfis', 'dataCriacao', 'quemModificou', 'dataModificacao', 'actions'];
}
