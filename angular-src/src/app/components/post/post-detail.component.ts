import { User } from './../../models/user';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {

  post: Post;
  comment: String;

  user: User;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(user => {
      this.user = user;
    }, err => {
      console.log(err);
      return false;
    })
    const postId = this.activatedRoute.snapshot.params['postId'];
    this.postService.getPostById(postId).subscribe(data => {
      this.post = data;
      console.log(this.authService.user);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onCommentAddSubmit() {
    if(!this.user){
      this.router.navigateByUrl('/login');
      return false;
    }
    if(!this.comment){
      this.flashMessagesService.show('Insert comment text', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    console.log('still in detail');
    const comment = {
      username: this.user.username,
      text: this.comment,
      postId: this.post._id
    }
    this.postService.addComment(comment, this.authService.authToken).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show('You added a new comment', {cssClass: 'alert-success', timeout: 3000});
        location.reload();
        //this.router.navigate(['/post/list']);
      } else {
        this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});  
        //this.router.navigate(['/post/add']);
      }
    });
  }
  

}
