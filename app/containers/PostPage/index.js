/**
 *
 * PostPage
 *
 */

import { Switch, Route, Link, NavLink } from 'react-router-dom';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectPosts, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadPosts } from './actions';

import LoadingIndicator from 'components/LoadingIndicator';
import StyledButton from 'components/Button/StyledButton';

import PostPageAdd from 'containers/PostPageAdd';

/* eslint-disable react/prefer-stateless-function */
export class PostPage extends React.PureComponent {
  componentDidMount() {
    this.props.loadAllPosts();
  }

  render() {
    const posts = this.props.posts.map(p => <li key={p.id}>{p.title} <Link to={`${this.props.match.path}/edit/${p.id}`}>Edit</Link></li>);
    return (
      <div>
        { this.props.loading && <LoadingIndicator></LoadingIndicator> }
        <ul>
          <li>
            <NavLink to={this.props.match.path}>List</NavLink>
          </li>
          <li>
            <NavLink to={`${this.props.match.path}/add`}>Add New</NavLink>
          </li>
        </ul>

        <ul>
        { posts }
        </ul>

        <Route path={`${this.props.match.path}/add`} component={PostPageAdd} />
        <Route path={`${this.props.match.path}/edit/:postId`} component={PostPageAdd} />
      </div>
    );
  }
}

PostPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  posts: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.bool]),
  loadAllPosts: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectPosts(),
  loading: makeSelectLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    loadAllPosts: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadPosts());
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'postPage', reducer });
const withSaga = injectSaga({ key: 'postPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PostPage);
