import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MovieComponent } from "./movie.component";
import { MovieService } from "./service/movie.service";
import { RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";
import { ListMovieComponent } from './list-movie/list-movie.component';
import { AddMovieComponent } from './add-movie/add-movie.component';

let routing = [
  { path: "", component: MovieComponent },
  { path: "**", redirectTo: "" }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routing), HttpModule],
  declarations: [MovieComponent, ListMovieComponent, AddMovieComponent],
  providers: [MovieService]
})
export class MovieModule {}
