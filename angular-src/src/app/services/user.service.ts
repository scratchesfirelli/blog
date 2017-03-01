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

}
