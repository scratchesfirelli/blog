import { UserService } from './../../services/user.service';
import { Post } from './../../models/post';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  posts: Post[];
  user: User;
  constructor(
        private postService: PostService,
        private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    const username = this.activatedRoute.snapshot.params['username'];
    this.userService.getUserByUsername(username).subscribe(user => {
      this.user = user;
    }, err => {
      console.log(err);
      return false;
    });

    this.postService.getUsersPosts(username).subscribe(posts => {
      this.posts = posts;
    }, err => {
      console.log(err);
      return false;
    });
  }

}
