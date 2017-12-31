import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./post.component";
import { PostService } from "./service/post.service";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { NgReduxModule } from "ng2-redux";

let routing = [
  { path: "", component: PostComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routing), HttpModule],
  declarations: [PostComponent],
  providers: [PostService]
})
export class PostModule {}
