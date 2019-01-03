import { fromJS } from 'immutable';
import postPageAddReducer from '../reducer';

describe('postPageAddReducer', () => {
  it('returns the initial state', () => {
    expect(postPageAddReducer(undefined, {})).toEqual(fromJS({}));
  });
});
