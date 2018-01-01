import { CREATE_MOVIE } from "../movie.action";
import { MovieService } from "../service/movie.service";
import { Component, OnInit } from "@angular/core";
import { NgRedux } from "ng2-redux";
import { ICMStore } from "../../root.reducer";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.css"]
})
export class AddMovieComponent implements OnInit {
  constructor(private movieService: MovieService, private redux: NgRedux<ICMStore>) {}

  ngOnInit() {}

  addMovie(movie) {
    this.movieService
      .addMovies(movie)
      .subscribe(res => this.redux.dispatch({ type: CREATE_MOVIE , val: res }));
  }
}
