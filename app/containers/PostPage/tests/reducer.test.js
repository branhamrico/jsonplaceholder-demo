import { fromJS } from 'immutable';
import postPageReducer from '../reducer';

describe('postPageReducer', () => {
  it('returns the initial state', () => {
    expect(postPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
