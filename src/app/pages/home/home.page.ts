import { Post } from '../post/post';
import { PostService } from '../post/post.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public posts: Post[];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  public getPosts(): void {
    this.postService.getPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
}
