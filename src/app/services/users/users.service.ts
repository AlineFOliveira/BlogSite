import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Users } from '../../interfaces/users';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8080/api/admin/users';
  private key = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxODk2ODI0MywiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzE4ODgxODQzfQ.-NAWOjYSmJh8oyoUBkbjilNGyC6TUkCaVPp6VbcwsASgjTkV_dxJNVYl5DFZhaTXsTmYlZ2hMQSyw6pxQffvcg';
  private paginaAtual: number = 0;
  private sizeAtual: number = 0;

  constructor(private http: HttpClient, private dataPipe: DatePipe) { }

  getUsers(page: number, size: number): Observable<Users[]>{
    const headers = new HttpHeaders({//httpHeaders fornecem informações adicionais, transmitem metadados importantes. ex: tipo de midia que virá, credenciais, etc.
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });

    const apiUrlWithParams = `${this.apiUrl}?page=${page}&size=${size}`;


    return this.http.get<Users[]>(apiUrlWithParams, {headers})//faz a requisição, esperando um array blog e fornecendo os headers necessários e retorna o resultado 
    .pipe(//pra poder mexer nos resultados
      map(data => data.map(item =>({//faz operações alterando resultados obtidos
        id: item.id,
        login: item.login,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        imageUrl: item.imageUrl,
        activated: item.activated ? 'Ativo' : 'Inativo',
        langKey: item.langKey,
        createdBy: item.createdBy,
        createdDate: this.dataPipe.transform(item.createdDate, 'dd/MM/yyyy HH:mm:ss') ?? '',
        lastModifiedBy: item.lastModifiedBy,
        lastModifiedDate: this.dataPipe.transform(item.lastModifiedDate, 'dd/MM/yyyy HH:mm:ss') ?? '',
        authorities: item.authorities
      })))
    )
  }
}
