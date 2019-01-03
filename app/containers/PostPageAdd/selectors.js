import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { makeSelectPosts } from '../PostPage/selectors';

/**
 * Direct selector to the postPageAdd state domain
 */

const selectPostPageAddDomain = state => state.get('postPageAdd', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PostPageAdd
 */

const makeSelectPostPageAdd = () =>
  createSelector(selectPostPageAddDomain, substate => substate.toJS());

const makeSelectPostLoading = () =>
  createSelector(selectPostPageAddDomain, substate => substate.get('loading'));

const makeSelectEditingPost = () =>
  createSelector(selectPostPageAddDomain, substate => substate.get('editPost') || undefined );

export default makeSelectPostPageAdd;
export { selectPostPageAddDomain, makeSelectPostLoading, makeSelectPosts, makeSelectEditingPost };
