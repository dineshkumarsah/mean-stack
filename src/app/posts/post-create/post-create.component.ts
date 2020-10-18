import { Component ,EventEmitter, Output} from '@angular/core'
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import {PostService} from '../post.service'

@Component({
selector: 'app-create-post',
templateUrl: '../post-create/post-create.component.html',
styleUrls: ['../post-create/post-create.component.css']
})
export class PostCreateComponent{


constructor(private postService: PostService){}


  onAddPost(from: NgForm){
    if(from.invalid){
      return
    }
    const postAdded: Post={
      title: from.controls.enteredTitle.value,
      content: from.controls.enteredTitle.value,

    }

    this.postService.addPosts(postAdded).subscribe((message)=>{
     console.log(message.message);

    })
    from.resetForm();
  }

}
