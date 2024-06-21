import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../interfaces/users';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatListModule],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss'
})
export class ViewUsersComponent {

  user: Users | undefined;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        const login = params.get('login');
        if (login) {
            this.loadUser(login);
        }
    });
}

  loadUser(login: string){
    this.usersService.getUser(login).subscribe(user => this.user = user);
  }
}
