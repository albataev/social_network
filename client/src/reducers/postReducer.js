import {
  ADD_POSTS,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  ADD_LIKE
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
    case POST_LOADING:
      console.log('[postReducer POST_LOADING fired]');
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      console.log('[postReducer GET_POSTS fired]');
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      console.log('[postReducer GET_POST fired]');
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POSTS:
      console.log('[postReducer ADD_POSTS fired]');
      return {
        ...state,
        posts: [action.payload, ...state.posts]
    };
    case DELETE_POST:
      console.log('[postReducer DELETE_POST fired]');
      return {
        ...state,
        posts: state.posts
          .filter(post => post._id !== action.payload)
    };
  }
}

