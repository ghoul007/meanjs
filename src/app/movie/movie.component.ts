import { MovieService } from "../movie.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  movies: any = [];
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe(res => {
      this.movies = res;
    });
  }
}
