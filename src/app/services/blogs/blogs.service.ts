import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blog } from '../../interfaces/blog';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private apiUrl = 'http://localhost:8080/api/blogs'
  private key = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxODg4MTE0MSwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzE4Nzk0NzQxfQ.oRaZalEben-Ges7XDSVpMMyJEDOfUDl2rgLUGlWpvAk50tj7vh8NMqay5UOv4bKhx4BolbNr2-c6UYxkbyBtAA';

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

  createBlog(blog: Blog): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.post<Blog>(this.apiUrl, blog, { headers });

    //era pra funcionar, n funcionou
      // return this.getBlogs().pipe(
      //   map(blogs => {
      //     const lastId = Math.max(...blogs.map(blog => blog.id), 0);
      //     const newId = lastId + 1;
      //     return { ...blog, id: newId };
      //   }),
      //   map(newBlog => {
      //     const headers = new HttpHeaders({
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${this.key}`
      //     });
      //     return this.http.post<Blog>(this.apiUrl, newBlog, { headers });
      //   })
      // );



    // return this.createNextId().pipe(//chama o nextId        n deu certp esse q fiz
    //   switchMap((novoId) => {//transforma  valor obtido por um observable em outro observable...... q
    //     //trata o valor obtido de um observable
    //     blog.id = novoId; //obriga o blog.id a ter esse valor novo
    //     const headers = new HttpHeaders({
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${this.key}`
    //     });//E é então que somente ai que chama o post
    //     return this.http.post<Blog>(this.apiUrl, blog, { headers });
    //   })
    // );
  }

  // createNextId(): Observable<number>{//jeusus
  //   return this.getBlogs().pipe(
  //     map(blogs => {
  //       if (blogs.length === 0) {
  //         return 1; //Se não houver blogs, retorna ID 1
  //       }
  //       const proximoId = Math.max(...blogs.map(blog => blog.id), 0);//math.max pega o maior valor. Os ... pontos são spread, invés de retornar uma lista de arrays, ele retornara o conteudo. Ex: invés de [[1, 2], [3, 4]] faz ficar [1, 2, 3, 4]
  //       //ali em cima ele mapeia os blogs também, salva o id de cada blog em um array e o spread atua nele. No mat.max, se o array está vazio, ele retornará 0
  //       return proximoId + 1; //simplesmente soma
  //     })
  //   )
  // }

  updateBlog(blog: Blog): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.put(`${this.apiUrl}/${blog.id}`, blog, { headers }); 
  }
}
