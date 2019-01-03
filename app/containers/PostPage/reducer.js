/*
 *
 * PostPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, POSTS_LOADED_SUCCESS, POSTS_LOADING_ERROR, LOAD_POSTS } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  posts: []
});

function postPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_POSTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('posts', []);
    case POSTS_LOADED_SUCCESS:
      return state
        .set('loading', false)
        .set('posts', action.posts);
    case POSTS_LOADING_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default postPageReducer;
