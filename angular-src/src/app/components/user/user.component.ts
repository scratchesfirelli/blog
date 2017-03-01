import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  users: {
    name: String,
    email: String,
    username: String
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getList().subscribe(data => {
      this.users = data.users;
    }, err => {
      console.log(err);
      return false;
    })
  }

}
