import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieComponent } from "./movie.component";
import { MovieService } from "./service/movie.service";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

let routing = [
  { path: "", component: MovieComponent },
  { path: "**", redirectTo: "" }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routing), HttpModule],
  declarations: [MovieComponent],
  providers: [MovieService]
})
export class MovieModule {}
