import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Users } from '../../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8080/api/admin/users';

  constructor(private http: HttpClient) { }

  // getUsers(): Observable<Users[]>{
  //   const headers = new HttpHeaders({//httpHeaders fornecem informações adicionais, transmitem metadados importantes. ex: tipo de midia que virá, credenciais, etc.
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxODcwODcxMCwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzE4NjIyMzEwfQ.8XKWc1f6eJVNDJHcSkVYrr-Dzx1HoH8VXDalOdOeMELmQoSpKB-n8YR57nkbT0aDUNoD5_XLT5uAQGEVmX6VcQ`
  //   });
  //   return this.http.get<Users[]>(this.apiUrl, {headers})//faz a requisição, esperando um array blog e fornecendo os headers necessários e retorna o resultado 
  //   .pipe(//pra poder mexer nos resultados
  //     map(data => data.map(item =>({
  //       id: item.id,
  //       login: item.login,
  //       firstName: item.firstName,
  //       lastName: item.lastName,
  //       email: item.email,
  //       imageurl: item.imageUrl,
  //       activated: item.activated,
  //       langKey: item.langKey

  //     })))
  //   )
  // }
}
