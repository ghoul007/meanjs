import { IMovie } from "../model/movie";
import { CREATE_MOVIE, FETCH_MOVIE, DELETE_MOVIE } from '../movie.action';

export interface IMovieState {
  movies?: IMovie[];
}

export const INIT_MOVIE_STATE: IMovieState = {
  movies: []
};

class movieImplementer {
  constructor(private state: IMovieState, private action) { }

  fetchMovie() {
    return Object.assign({}, this.state, { movies: this.action.val });
  }

  createMovie() {
    return Object.assign({}, this.state, { movies: [this.action.val, ...this.state.movies] });
  }
  deleteMovie() {
    let listMovies = this.state.movies.filter(res => (res.id != this.action.val.id));
    return Object.assign({}, this.state, { movies: listMovies });
  }
}

export const movieReducer = (
  state: IMovieState = INIT_MOVIE_STATE,
  action
): IMovieState => {
  let movieImpl = new movieImplementer(state, action);
  switch (action.type) {
    case FETCH_MOVIE:
      return movieImpl.fetchMovie();
    case CREATE_MOVIE:
      return movieImpl.createMovie();
    case DELETE_MOVIE:
      return movieImpl.deleteMovie();

    default:
      return state;
  }
};
