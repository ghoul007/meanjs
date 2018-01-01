import { IPost } from "../model/post";
import { FETCH_POST } from "../post.action";

export interface IPostState {
  posts?: IPost[];
}

export const INIT_POST_STATE: IPostState = {
  posts: []
};

class postImplementer {
  constructor(private state: IPostState, private action) { }

  fetchPost() {
    return Object.assign({}, this.state, { posts: this.action.val });
  }
}

export const postReducer = (
  state: IPostState = INIT_POST_STATE,
  action
): IPostState => {
  let postImpl = new postImplementer(state, action);

  switch (action.type) {
    case FETCH_POST:
      return postImpl.fetchPost();

    default:
      return state;
  }
};
