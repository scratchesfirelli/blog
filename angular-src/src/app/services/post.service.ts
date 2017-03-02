import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  addPost(post, token) {
    let headers = new Headers();
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/add', post, {headers: headers})
      .map(res => res.json());
  }

  getPosts(page : Number = 1, pageSize: Number = 10) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('page', page.toString());
    headers.append('pageSize', pageSize.toString());
    return this.http.get('http://localhost:3000/posts/getPosts', {headers: headers})
      .map(res => res.json());
  }

  getPostsById(postId) {
    let headers = new Headers();
    headers.append('postId', postId);
    return this.http.get('http://localhost:3000/posts/getPostById', {headers: headers})
      .map(res => res.json());
  }

  getPostsTotalCount() {
    return this.http.get('http://localhost:3000/posts/getPostsTotalCount')
      .map(res => res.json());
  }

  addComment(comment, token) {
    let headers = new Headers();
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/addComment', comment,  {headers: headers})
      .map(res => res.json());
  }

  editPost(post, token) {
    let headers = new Headers();
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/editPost', post,  {headers: headers})
      .map(res => res.json());
  }

}
