import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl:'../post-list/post-list.component.html',
  styleUrls: ['../post-list/post-list.component.css']

})
export class PostListComponent implements OnInit,OnDestroy{

post: Post[]=[]
pstSubscriptio: Subscription
  constructor(private postService: PostService){}

  ngOnInit(){
    this.getPosts();
    this.postService.getNotificacion().subscribe({
      next: ()=>{
        this.getPosts();
      }
    })

  }

  getPosts(){

    this.postService.getPosts().subscribe((post)=>{
      console.log(post);
      this.post=post

    })
  }
  onDelete(id: string){
  this.postService.postDelete(id).subscribe({
    next: (res)=>{
      console.log(res);
      this.getPosts()

    },
    error: (error: HttpErrorResponse)=>{
     console.log(error);

    }
  })
  }

ngOnDestroy(){
  this.pstSubscriptio.unsubscribe()
}

}
