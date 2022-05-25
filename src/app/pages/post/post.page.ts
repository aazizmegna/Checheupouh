import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { PostService } from './post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm }   from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  public posts!: Post[];
  public editPost!: Post;
  public deletePost!: Post;

  constructor(private postService: PostService, private route: Router) { }

  ngOnInit() {
    this.getPosts();
    console.log(this.getPosts());
    
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

  public onAddPost(addForm: NgForm): void {
    document.getElementById('add-post-form')!.click();
    this.postService.addPost(addForm.value).subscribe(
      (response: Post) => {
        console.log(response);
        this.getPosts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePost(post: Post): void {
    this.postService.updatePost(post).subscribe(
      (response: Post) => {
        console.log(response);
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPosts(key: string): void{
    const results: Post[] = [];
    for (const post of this.posts){
       if(post.countryDeparture.toLowerCase().indexOf(key.toLowerCase()) !== -1
       || post.countryArrival.toLowerCase().indexOf(key.toLowerCase()) !== -1
       || post.cityDeparture.toLowerCase().indexOf(key.toLowerCase()) !== -1
       || post.cityArrival.toLowerCase().indexOf(key.toLowerCase()) !== -1
       || post.date.toLowerCase().indexOf(key.toLowerCase()) !== -1
       || post.info.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(post);
       }
    }
    this.posts = results;
    if(results.length === 0 || !key){
      this.getPosts();
    }
  }

  public onOpenModal(post: Post, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display ='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addPostModal');
    }
    if(mode==='edit'){
      this.editPost = post;
      button.setAttribute('data-target','#updatePostModal');
    }
    if(mode==='delete'){
      this.deletePost = post;
      button.setAttribute('data-target','#deletePostModal');
    }
    container.appendChild(button);
    button.click();
  }

  public goToHomePage() {
    this.route.navigate(['/home']);
  }

}
