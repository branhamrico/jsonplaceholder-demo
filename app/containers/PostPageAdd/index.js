/**
 *
 * PostPageAdd
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import Form from 'components/Form';

import { loadPost, addPost, addPostSuccess, addPostError, putPost } from './actions';
import { makeSelectPostLoading, makeSelectEditingPost } from './selectors';
import { push as redirect } from 'connected-react-router/immutable';
import post from './http';

/* eslint-disable react/prefer-stateless-function */
export class PostPageAdd extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: '',
      body: '',
      userId: 1
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.match.params) return;
    this.props.loadPost(this.props.match.params.postId);
  }

  onSubmit(evt) {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    this.props.dispatchSubmit();
    try {
      const data = { ...this.state };
      if (this.props.match.params.postId) {
        this.props.postPost(data);
      } else {
        delete data.id;
        this.props.updatePost(data);
      }
    } catch (error) {
      this.props.dispatchError(error);
    }
  }

  onTitleChange(evt) {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    this.setState({
      title: evt.target.value
    });
  }

  onBodyChange(evt) {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    this.setState({
      body: evt.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    // set editing body regardless in add or edit page
    this.setState({
      ...nextProps.editingPost
    });
  }

  render() {
    const enabled = !(this.state.title && this.state.body);
    return (
      <div>

        <Form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input id="title" className="form-control" type="text" value={this.state.title} onChange={this.onTitleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <input id="body" className="form-control" type="text" value={this.state.body} onChange={this.onBodyChange} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={enabled}>{ !this.props.loading ? 'Submit' : 'Submitting...'}</button>
        </Form>
      </div>
    );
  }
}

PostPageAdd.propTypes = {
  editingPost: PropTypes.oneOfType([PropTypes.any, PropTypes.object]),
  loading:  PropTypes.bool,
  dispatchSubmit: PropTypes.func,
  dispatchSuccess: PropTypes.func,
  dispatchError: PropTypes.func,
  backToList: PropTypes.func,
  postPost: PropTypes.func,
  updatePost: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectPostLoading(),
  editingPost: makeSelectEditingPost()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSubmit: () => dispatch(addPost()),
    dispatchSuccess: () => dispatch(addPostSuccess()),
    dispatchError: (error) => dispatch(addPostError(error)),
    backToList: () => dispatch(redirect('/posts')),
    loadPost: (postId) => dispatch(loadPost(postId)),
    postPost: (body) => dispatch(addPost(body)),
    updatePost: (body) => dispatch(putPost(body))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'postPageAdd', reducer });
const withSaga = injectSaga({ key: 'postPageAdd', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PostPageAdd);
