import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  title: String;
  tags: String;
  content: String;
  author: String;

  posts: any;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.author = data.user.username;
    }, 
    err => {
      console.log(err);
      return false;
    });
    this.postService.getPosts(1).subscribe(data => {
      this.posts = data.posts;
    }, err => {
      console.log(err);
      return false;
    });
  }

  onPostSubmit() {    
    const post = {
      title: this.title,
      tags: this.tags.trim().split(','),
      content: this.content,
      author: this.author
    }
    console.log(post);
    /*
    //Required fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validate email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show('Please use validate email', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }

    //Verify password
    if(!this.validateService.confirmPassword(user.password, user.passwordConfirm)){
      this.flashMessagesService.show('Passwords don\'t match', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }*/

    this.postService.addPost(post).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show('You added a new post', {cssClass: 'alert-success', timeout: 3000});  
        //this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});  
        this.router.navigate(['/post']);
      }
    });
  }

}
