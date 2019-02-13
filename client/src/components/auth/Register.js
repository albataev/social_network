import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import classnames from 'classnames';
import { connect} from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  // No need if using arrow functions
  // constructor() {
  //   super();
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this)
  // }

  componentWillReceiveProps(nextProps, nextContext) {
    // we are doing this to update errors and to leave our
    // error check in the inputs
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors})
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // second param "this.props.history" allows to use "history"
    // inside registerUser to redirect to login page if success
    // to do this need to use withRouter in "export default connect"
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth;
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Регистрация</h1>
                <p className="lead text-center">Создать аккаунт на DevConnector</p>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                      })}
                      placeholder="Имя"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      required
                    />
                    <div className="invalid-feedback">{errors.name}</div>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                      })}
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use
                      a Gravatar email
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                      })}
                      placeholder="Пароль"
                      value={this.state.password}
                      onChange={this.onChange}
                      name="password"
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                      })}
                      placeholder="Подтвердить пароль"
                      value={this.state.password2}
                      onChange={this.onChange}
                      name="password2"
                    />
                    <div className="invalid-feedback">{errors.password2}</div>
                  </div>
                  <input
                    type="submit"
                    value="Зарегистрироваться"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.proTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// to get access to redux auth state in our component:
const mapStateToProps = (state) => ({
  // this comes from the root reducer:
  auth: state.auth,
  errors: state.errors
});
// it is easy to use
// withrouter allows allows to export and use "history"
// inside authActions->registerUser
export default connect(mapStateToProps, {registerUser})(withRouter(Register));
