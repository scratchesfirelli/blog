import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html'
})
export class PostEditComponent implements OnInit {
    postId: String;
    title: String;
    intro: String;
    tags: String;
    content: String;


  constructor(
    private postService: PostService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authService.loadToken();
    const postId = this.activatedRoute.snapshot.params['postId'];
    this.postService.getPostById(postId).subscribe(data => {
        this.postId = data._id;
        this.title =data.title;
        this.intro = data.intro;
        this.tags = data.tags.join();
        this.content = data.content;
    }, err => {
        console.log(err);
      return false;
    });
  }

  private trimTags(tags) {
      var trimmedTags : String[] = [];
      tags.forEach(element => {
          trimmedTags.push(element.trim());
      });
      return trimmedTags;
  }

  onPostSaveSubmit() {    
    const post = {
      postId: this.postId,
      title: this.title,
      intro: this.intro,
      tags: this.trimTags(this.tags.split(',')),
      content: this.content
    }


    this.postService.editPost(post, this.authService.authToken).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show('You edited your post', {cssClass: 'alert-success', timeout: 3000});  
        this.router.navigate(['/post/'+this.activatedRoute.snapshot.params['postId']]);
      } else {
        this.flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(["/post/edit/"+this.activatedRoute.snapshot.params['postId']]);
      }
    });
  }

}
