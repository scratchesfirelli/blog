import { User } from './../models/user';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getList() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/list',  {headers: headers})
      .map(res => res.json());
  }
  getUserByUsername(username): Observable<User> {
    let headers = new Headers();
    headers.append('username', username);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getUserByUsername',  {headers: headers})
      .map(res => res.json().user);
  }

}
