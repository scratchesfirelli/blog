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

  post: {
    _id: String,
    title: String,
    content: String,
    author: String,
    tags: String,
    rating: Number,
    comments: {
      username: String,
      text: String,
      date: Date;
    }
  };

  comment: String;

  user: {
    name: String,
    email: String,
    username: String
  };

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    if(this.authService.user) {
      this.user = this.authService.user;
    }
    const postId = this.activatedRoute.snapshot.params['postId'];
    this.postService.getPostsById(postId).subscribe(data => {
      this.post = data.post;
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
        this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});  
        //this.router.navigate(['/post/add']);
      }
    });
  }
  

}
