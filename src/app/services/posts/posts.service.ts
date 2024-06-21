import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { Posts } from '../../interfaces/posts';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost:8080/api/posts'
  private key = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxOTA1MzU3MiwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzE4OTY3MTcyfQ.nlHcDYk2TpiRA3z0Ilft-9iJu895Mgt1xZqhpaNk9uPCLSxc_llrm4oDLmw7uV9BlPBcbi10U-Fd6f79sItGBw';



  constructor(private http: HttpClient, private dataPipe: DatePipe) { 
  }

  

  getPosts(): Observable<Posts[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.get<Posts[]>(this.apiUrl, {headers})
    .pipe(
      map(data => data.map(item =>({
        id: item.id,
        title: item.title,
        content: item.content,
        date: this.dataPipe.transform(item.date, 'dd/MM/yyyy HH:mm:ss') ?? '',
        blog: item.blog ? { //da interface
          id: item.blog.id,
          name: item.blog.name,
          handle: item.blog.handle,
          user: item.blog.user
        } : null

      })))
    )
  }

  getPost(id: number): Observable<Posts> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.get<Posts>(`${this.apiUrl}/${id}`, {headers});
  }

  updatePost(post: Posts): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });
    return this.http.put(`${this.apiUrl}/${post.id}`, post, { headers });
  }
}
