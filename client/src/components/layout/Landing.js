import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect} from "react-redux";

class Landing extends Component {

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector
                </h1>
                <p className="lead">
                  Создай свой профиль разработчика,
                  <br/> размести портфолио,
                  <br/> решай проблемы с другими участниками
                  <br/> Покажи свои достижения рекрутеру
                  </p>
                <hr/>
                <Link to="/register" className="btn btn-lg btn-info mr-2">Зарегистрироваться</Link>
                <Link to="/login" className="btn btn-lg btn-light">Войти</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.proTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// to get access to redux auth state in our component:
const mapStateToProps = (state) => ({
  // this comes from the root reducer:
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Landing);

