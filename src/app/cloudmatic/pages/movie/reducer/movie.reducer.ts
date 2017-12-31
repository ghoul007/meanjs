import { IMovie } from "../model/movie";
import { FETCH_MOVIE } from "../movie.action";

export interface IMovieState {
  movies?: IMovie[];
}

export const INIT_MOVIE_STATE: IMovieState = {
  movies: []
};

class movieImplementer {
  constructor(private state: IMovieState, private action) {}

  fetchMovie() {
    return Object.assign({}, this.state, { movies: this.action.val });
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

    default:
      return state;
  }
};
