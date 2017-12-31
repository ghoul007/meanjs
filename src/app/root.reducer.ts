import { INIT_MOVIE_STATE, movieReducer, IMovieState } from "./cloudmatic/pages/movie/reducer/movie.reducer";
import { INIT_POST_STATE, postReducer, IPostState } from "./cloudmatic/pages/post/reducer/post.reducer";
import { combineReducers} from "redux"


export interface ICMStore {
  movie?: IMovieState;
  post?: IPostState;
}

export const INIT_STATE: ICMStore = {
  movie: INIT_MOVIE_STATE,
  post: INIT_POST_STATE
};

export const rootReducer =
  combineReducers({
    movie: movieReducer,
    post: postReducer,
  });
