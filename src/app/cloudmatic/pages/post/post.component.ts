import { PostService } from "./service/post.service";
import { Component, OnInit } from "@angular/core";
import { select, NgRedux } from "ng2-redux";
import { ICMStore } from '../../../root.reducer';
import { FETCH_MOVIE } from "../movie/movie.action";
import { IPost } from "./model/post";
import { FETCH_POST } from "./post.action";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  title = "app";
  // posts: any = [];

  @select((c: ICMStore) => c.post.posts) posts: IPost[];

  constructor(private postService: PostService, private redux: NgRedux<ICMStore>) {}

  public ngOnInit(): void {


    this.postService.getPosts().subscribe(res => {
    // this.posts = res;
    this.redux.dispatch({ type: FETCH_POST , val : res });
    });
  }
}
