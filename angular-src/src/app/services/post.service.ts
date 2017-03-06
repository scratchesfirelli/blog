import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';

@Injectable()
export class PostService {
  private postsUrl: String = 'http://localhost:3000/posts/';

  constructor(private http: Http) { }

  addPost(post, token) {
    let headers = new Headers();
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.postsUrl + 'add', post, {headers: headers})
      .map(res => res.json());
  }
  /**
   * Get posts on certain page
  */  
  getPosts(page : Number = 1, pageSize: Number = 10): Observable<Post[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('page', page.toString());
    headers.append('pageSize', pageSize.toString());
    return this.http.get( this.postsUrl + 'getPosts', {headers: headers})
      .map(res => res.json().posts);
  }

  /**
   * Get specific post using id
  */
  getPostById(postId): Observable<Post> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('postId', postId);
    return this.http.get(this.postsUrl + 'getPostById', {headers: headers})
      .map(res => res.json().post);
  }

  /**
   * Get specific post using id
  */
  getUsersPosts(username): Observable<Post[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('username', username);
    return this.http.get(this.postsUrl + 'getUsersPosts', {headers: headers})
      .map(res => res.json().posts);
  }

  getPostsTotalCount() {
    return this.http.get(this.postsUrl + 'getPostsTotalCount')
      .map(res => res.json());
  }

  addComment(comment, token) {
    let headers = new Headers();
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.postsUrl + 'addComment', comment,  {headers: headers})
      .map(res => res.json());
  }

  editPost(post, token) {
    let headers = new Headers();
    headers.append('Authorization', token);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.postsUrl + 'editPost', post,  {headers: headers})
      .map(res => res.json());
  }

}
