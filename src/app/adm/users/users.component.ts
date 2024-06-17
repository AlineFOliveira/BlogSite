import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Users } from '../../interfaces/users';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatTableModule, MatPaginatorModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: Users[] = [
    {codigo: 1001, login: "admin", email: "admin@localhost", situacao: "Ativo", idioma: "pt-br", perfis: "ROLE_ADMIN", dataCriacao: "", quemModificou: "system", dataModificacao: "14/06/24 09:06"},

  ];

  displayedColumns = ['codigo', 'login', 'email', 'situacao', 'idioma', 'perfis', 'dataCriacao', 'quemModificou', 'dataModificacao'];
}
