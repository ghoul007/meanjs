import { PostService } from "./post.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  posts: any = [];
  constructor(private postService: PostService) {}

  public ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }
}
