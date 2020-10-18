import { Injectable, Injector } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import {map} from 'rxjs/operators'
import { Post } from './post.model';
import {HttpClient} from '@angular/common/http'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({providedIn:'root'})
export class PostService{
post: Post[]=[]
 _postObservable=new Subject<Post[]>()


constructor(private http: HttpClient){}

getNotificacion(): Observable<any> {
  return this._postObservable.asObservable();
}


  addPosts(post: Post){
    return this.http.post<{message: string}>("http://localhost:3000/api/posts",post).pipe(
      map((message)=>{
      this._postObservable.next();
      return message
      })
    )
  }
  getPosts(){
    return this.http.get<{message: string,posts: any}>('http://localhost:3000/api/posts').pipe(
      map((result)=>{
        return result.posts.map(post=>{
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        });
      })
    )
  }


postDelete(id: string){
  return this.http.delete("http://localhost:3000/api/posts/"+id).pipe(
    map((res)=>{
      this._postObservable.next();
      return res
    })
  );
}


  }
