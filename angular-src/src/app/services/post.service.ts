import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  addPost(post) {
    console.log('in addPost');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/add', post, {headers: headers})
      .map(res => res.json());
  }

  getPosts(page) {
    page = page || 0;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/posts/list',  {headers: headers})
      .map(res => res.json());
  }

}
