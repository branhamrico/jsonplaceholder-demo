import { call, put, takeLatest } from 'redux-saga/effects';
import { API_URL } from 'utils/constants';
import request from 'utils/request';
import { postsLoaded, postsLoadingError } from './actions';
import { LOAD_POSTS } from './constants';

export function* getPosts(action) {
  const requestURL = `${API_URL}/posts`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(postsLoaded(repos));
  } catch (err) {
    yield put(postsLoadingError(err));
  }
}

// Individual exports for testing
export default function* postPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_POSTS, getPosts);
}
