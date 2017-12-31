import { MovieService } from "./service/movie.service";
import { Component, OnInit } from "@angular/core";
import { select, NgRedux } from "ng2-redux";
import { ICMStore } from '../root.reducer';
import { FETCH_MOVIE } from "./movie.action";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  @select((c:ICMStore) => c.movie.movies ) movies ;
  constructor(private movieService: MovieService , private redux : NgRedux<ICMStore>) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(res => {
      this.redux.dispatch({type:FETCH_MOVIE, val:res})
    });
  }
}
