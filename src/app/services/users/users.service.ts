import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Users } from '../../interfaces/users';
import { DatePipe } from '@angular/common';
import { Blog } from '../../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8080/api/admin/users';
  private key = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxOTA1MzU3MiwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzE4OTY3MTcyfQ.nlHcDYk2TpiRA3z0Ilft-9iJu895Mgt1xZqhpaNk9uPCLSxc_llrm4oDLmw7uV9BlPBcbi10U-Fd6f79sItGBw';
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
        activated: item.activated,
        langKey: item.langKey,
        createdBy: item.createdBy,
        createdDate: item.createdDate,
        lastModifiedBy: item.lastModifiedBy,
        lastModifiedDate: new Date(item.lastModifiedDate),
        authorities: item.authorities
      })))
    )
  }

  getUsersTotal(){
    const headers = new HttpHeaders({//httpHeaders fornecem informações adicionais, transmitem metadados importantes. ex: tipo de midia que virá, credenciais, etc.
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });

    return this.http.get<Users[]>(this.apiUrl, {headers})//faz a requisição, esperando um array blog e fornecendo os headers necessários e retorna o resultado 
    .pipe(//pra poder mexer nos resultados
      map(data => data.length)//o data é todos os registros que estão no banco, o length pega o 'tamanho', então, pega o numero total quantidade de registros que tem ali
    )
  }

  updateActivateUser(user: Users): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });

    return this.http.put(`${this.apiUrl}/${user.id}`, user, { headers }); 
  }

  getUser(login: string): Observable<Users>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });

    return this.http.get<Users>(`${this.apiUrl}/${login}`, { headers }); 
  }
}
