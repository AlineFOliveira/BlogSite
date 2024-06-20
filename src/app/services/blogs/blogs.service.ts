import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blog, newBlog } from '../../interfaces/blog';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private apiUrl = 'http://localhost:8080/api/blogs'
  private key = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxODk2ODI0MywiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzE4ODgxODQzfQ.-NAWOjYSmJh8oyoUBkbjilNGyC6TUkCaVPp6VbcwsASgjTkV_dxJNVYl5DFZhaTXsTmYlZ2hMQSyw6pxQffvcg';

  // private Blogs: Blog[] = [//chama a interface lá
  //   {codigo: 1001, name: "Admin's blog", handle: "Admin", user: "admin"},
  //   {codigo: 1002, name: "User's blog", handle: "User", user: "user"}
  // ]



  //o HttpClient faz requisições para um servidor remoto
  constructor(private http: HttpClient) { 
  }

  

  getBlogs(): Observable<Blog[]> {//faz requisição get para a api, retorna observable que emite arrays de objeto blog
    const headers = new HttpHeaders({//httpHeaders fornecem informações adicionais, transmitem metadados importantes. ex: tipo de midia que virá, credenciais, etc.
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.get<Blog[]>(this.apiUrl, {headers})//faz a requisição, esperando um array blog e fornecendo os headers necessários e retorna o resultado 
    .pipe(//pra poder mexer nos resultados
      map(data => data.map(item =>({
        id: item.id,
        name: item.name,
        handle: item.handle,
        user: item.user ? {
          id: item.user?.id,
          login: item.user?.login
        } : null
      })))
    )
  }

  getBlog(id: number): Observable<Blog> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.get<Blog>(`${this.apiUrl}/${id}`, {headers});//a mesma coisa que o de cima, com a diferenca de que fornece um código especifico para buscar por um registro específico :)
  }

  createBlog(blog: newBlog): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.post<Blog>(this.apiUrl, blog, { headers });
  }


  updateBlog(blog: Blog): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.put(`${this.apiUrl}/${blog.id}`, blog, { headers }); 
  }

  deleteBlog(id: number): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers }); 
  }
}
