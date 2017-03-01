import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

  constructor(
        private postService: PostService,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
  }

}
