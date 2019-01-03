/*
 *
 * PostPageAdd actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_POST,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  SET_EDIT_POST,
  PUT_POST,
  PUT_POST_SUCCESS,
  PUT_POST_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPost(postId) {
  return {
    type: LOAD_POST,
    postId
  };
}

export function setEditPost(editPost) {
  return {
    type: SET_EDIT_POST,
    editPost
  };
}

export function addPost(body) {
  return {
    type: ADD_POST,
    body
  };
}

export function addPostSuccess(post) {
  return {
    type: ADD_POST_SUCCESS,
    post
  };
}

export function addPostError(error) {
  return {
    type: ADD_POST_ERROR,
    error
  };
}

export function putPost(body) {
  return {
    type: PUT_POST,
    body
  };
}

export function putPostSuccess(post) {
  return {
    type: PUT_POST_SUCCESS,
    post
  }
}

export function putPostError(error) {
  return {
    type: PUT_POST_ERROR,
    error
  }
}