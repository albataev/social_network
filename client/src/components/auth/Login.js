import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classnames from 'classnames';
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(loginData);

    this.props.loginUser(loginData);

  };


  render() {

    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Вход</h1>
              <p className="lead text-center">Войти на DevConnector</p>
              <form action="dashboard.html">
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
                    required
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder="Пароль"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <input
                  type="submit"
                  value="Войти"
                  className="btn btn-info btn-block mt-4"
                  onClick={this.onSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
