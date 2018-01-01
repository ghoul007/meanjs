import { MovieService } from '../service/movie.service';
import { Component, OnInit } from '@angular/core';
import { ICMStore } from '../../root.reducer';
import { NgRedux, select } from 'ng2-redux';
import { FETCH_MOVIE, DELETE_MOVIE } from '../movie.action';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css']
})
export class ListMovieComponent implements OnInit {

  // movies: any = [];
  @select((c: ICMStore) => c.movie.movies) movies;
  constructor(private redux: NgRedux<ICMStore>, private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe(res => {
      this.redux.dispatch({ type: FETCH_MOVIE, val: res })
    })
  }

  deleteMovie(movie) {
    this.movieService.deleteMovies(movie).subscribe(res => {
      this.redux.dispatch({ type: DELETE_MOVIE, val: movie })
    })
  }

}
