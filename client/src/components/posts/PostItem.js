import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from 'classnames';
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {

  onDeleteClick  = (id) => {
    this.props.deletePost(id)
  };

  findUserLike(likes) {
    const { auth } = this.props;
    return likes.filter(like => like.user === auth.user.id).length > 0;
  }

  onLikeClick = (id) => {
    // if(!this.findUserLike(this.props.post.likes) || !this.state.liked) {
    //   console.log('like clicked');
    //   this.setState({
    //     likes: this.state.likes + 1,
    //     liked: true,
    //     likedClass: "fas text-gray fa-thumbs-up text-info"
    //   });
    // }

    this.props.addLike(id);
    };

  onUnlikeClick = (id) => {
    this.props.removeLike(id)
  };

  render() {
    const {post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""/>
            </a>
            <br/>
            <p className="text-center">
              {post.name}
            </p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ?
              (
                <span>
                  <button
                    type="button"
                    onClick={()=>this.onLikeClick(post._id)}
                    className="btn btn-light mr-1"
                  >
                    <i className={classnames("fas text-gray fa-thumbs-up", {
                      'text-info': this.findUserLike(post.likes)
                    })} />
                    <span
                      className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={()=>this.onUnlikeClick(post._id, auth.user.id)}
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Комментарии
                  </Link>
                  {post.user === auth.user.id ?
                    (
                      <button
                        onClick={() => this.onDeleteClick(post._id)}
                        type="button"
                        className="btn btn-danger mr-1"
                      >
                        <i className="fas fa-times"/>
                      </button>
                    ) : null
                  }
                </span>
              ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  showActions: PropTypes.bool,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
