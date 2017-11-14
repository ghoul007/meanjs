import { PostService } from '../post.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  title = "app";
  posts: any = [];
  constructor(private postService: PostService) {}

  public ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }
}
