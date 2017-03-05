import { Component, OnInit } from '@angular/core';
import {PostService} from '../../services/post.service';
import {PaginationService} from '../../services/pagination.service';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  title: String;
  intro: String;
  tags: String;
  content: String;


  posts: any;
  pager: any = {};
  postsTotalCount: number;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paginationService: PaginationService) { }

  ngOnInit() {
    this.postService.getPostsTotalCount().subscribe(data => {
      this.postsTotalCount = data.postsTotalCount;
    }, err => {
      console.log(err);
      return false;
    });
    
    const page = this.activatedRoute.snapshot.params['pageNumber'];
    this.getPosts(page);
          
  }

  getPosts(page) { 
    this.postService.getPosts(page).subscribe(data => {
      this.posts = data.posts;
      if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.paginationService.getPager(this.postsTotalCount, page);
        
    }, err => {
      console.log(err);
      return false;
    });
  }
}
