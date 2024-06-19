import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Users } from '../../interfaces/users';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8080/api/admin/users';
  private key = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxODg4MTE0MSwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzE4Nzk0NzQxfQ.oRaZalEben-Ges7XDSVpMMyJEDOfUDl2rgLUGlWpvAk50tj7vh8NMqay5UOv4bKhx4BolbNr2-c6UYxkbyBtAA';


  constructor(private http: HttpClient, private dataPipe: DatePipe) { }

  getUsers(): Observable<Users[]>{
    const headers = new HttpHeaders({//httpHeaders fornecem informações adicionais, transmitem metadados importantes. ex: tipo de midia que virá, credenciais, etc.
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.get<Users[]>(this.apiUrl, {headers})//faz a requisição, esperando um array blog e fornecendo os headers necessários e retorna o resultado 
    .pipe(//pra poder mexer nos resultados
      map(data => data.map(item =>({
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
