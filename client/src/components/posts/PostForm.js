import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import Spinner from '../common/Spinner';
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  state = {
    text: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('OnSubmit clicked');
    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: '' })
  };

  onChange = (e) => {
    console.log('OnChange');
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Напишите что нибудь...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder={"Написать сообщение"}
                  name={"text"}
                  onChange={this.onChange}
                  value={this.state.text}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Отправить</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
