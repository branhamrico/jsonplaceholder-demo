/*
 *
 * PostPageAdd reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_EDIT_POST, ADD_POST, ADD_POST_SUCCESS, ADD_POST_ERROR, PUT_POST, PUT_POST_SUCCESS, PUT_POST_ERROR } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  editPost: {
    id: 0,
    title: '',
    body: '',
    userId: 0
  }
});

function postPageAddReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_POST:
      return state
        .set('loading', true)
        .set('error', false);
    case ADD_POST_SUCCESS:
      return state
        .set('loading', false);
    case ADD_POST_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case SET_EDIT_POST:
      return state
        .set('editPost', {
          ...state.editPost,
          ...action.editPost
        });
    case PUT_POST:
      return state
        .set('loading', true)
        .set('error', false);
    case PUT_POST_SUCCESS:
      return state
        .set('loading', false);
    case PUT_POST_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default postPageAddReducer;
