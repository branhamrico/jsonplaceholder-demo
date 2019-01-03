/*
 *
 * PostPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_POSTS, POSTS_LOADED_SUCCESS, POSTS_LOADING_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPosts() {
  return {
    type: LOAD_POSTS
  };
}

export function postsLoaded(posts) {
  return {
    type: POSTS_LOADED_SUCCESS,
    posts
  };
}

export function postsLoadingError(error) {
  return {
    type: POSTS_LOADING_ERROR,
    error
  };
}
