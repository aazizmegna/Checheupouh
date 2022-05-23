import { Post } from './post';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.apiServerUrl}/post/all`);
  }
  
  public addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(`${this.apiServerUrl}/post/add`, post);
  }

  public updatePost(post: Post): Observable<Post>{
    return this.http.put<Post>(`${this.apiServerUrl}/post/update`, post);
  }

  public deletePost(postId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/post/delete/${postId}`);
  }
}
