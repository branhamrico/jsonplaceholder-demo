import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { push as redirect } from 'connected-react-router/immutable';
import request from 'utils/request';
import { API_URL } from 'utils/constants';

import { LOAD_POST, ADD_POST, PUT_POST } from './constants';
import { setEditPost, addPostSuccess, addPostError, putPostSuccess, putPostError } from './actions';
import { makeSelectPosts } from './selectors';

export function* loadPost(action) {
  const posts = yield select(makeSelectPosts());
  const editPost = posts.find(p => p.id === Number(action.postId));
  yield put(setEditPost(editPost));
}

export function* postPost(action) {
  const options = {
      method: 'POST',
      body: JSON.stringify(action.body),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  };
  try {
    // Call our request helper (see 'utils/request')
    const newPost = yield call(request, `${API_URL}/posts`, options);
    yield put(addPostSuccess(newPost));
    yield put(redirect('/posts'));
  } catch (err) {
    yield put(addPostError(err));
  }
}

export function* putPost(action) {
  const options = {
      method: 'PUT',
      body: JSON.stringify(action.body),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
  };
  try {
    // Call our request helper (see 'utils/request')
    const updatedPost = yield call(request, `${API_URL}/posts/${action.body.id}`, options);
    yield put(putPostSuccess(updatedPost));
    yield put(redirect('/posts'));
  } catch (err) {
    yield put(putPostError(err));
  }
}

// Individual exports for testing
export default function* postPageAddSaga() {
  yield takeLatest(LOAD_POST, loadPost);
  yield takeLatest(PUT_POST, putPost);
  yield takeLatest(ADD_POST, postPost);
}
