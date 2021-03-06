import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html'
})
export class AddPostComponent implements OnInit {
  title: String;
  intro: String;
  tags: String;
  content: String;
  author: String;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(user => {      
      this.author = user.username;
      //console.log(this.author);
    }, 
    err => {
      console.log(err);
      return false;
    });
  }

  private trimTags(tags) {
      var trimmedTags : String[] = [];
      tags.forEach(element => {
          trimmedTags.push(element.trim());
      });
      return trimmedTags
  }

  onAddPostSubmit() {    
    const post = {
      title: this.title,
      intro: this.intro,
      tags: this.trimTags(this.tags.split(',')),
      content: this.content,
      author: this.author
    }
    console.log(post);

    this.postService.addPost(post, this.authService.authToken).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show('You added a new post', {cssClass: 'alert-success', timeout: 3000});  
        this.router.navigate(['/post/page/1']);
      } else {
        this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-success', timeout: 3000});  
        this.router.navigate(['/post/add']);
      }
    });
  }

}
