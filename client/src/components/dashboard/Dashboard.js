import React, {Component} from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions'
import Experience from '../../components/dashboard/Experience';
import Education from '../../components/dashboard/Education';

class Dashboard extends Component {
  componentDidMount() {
    console.log('[Dashboard] componentDidMount fired');
    this.props.getCurrentProfile();
  }

  onDeleteClick = (e) => {
    this.props.deleteAccount();
    console.log('OnDelete')
  };



  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if((profile === null) || loading) {
      dashboardContent = <Spinner />
    } else {
        // Check if user has a profile data
        if(Object.keys(profile).length > 0) {
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Добро пожаловать, <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              </p>
              <ProfileActions />
              <Experience experience={profile.experience}/>
              <Education education={profile.education}/>
              { /* TODO exp and edu */}
              <div style={{marginBottom: '60px'}} />
              <button onClick={this.onDeleteClick} className="btn btn-danger">Удалить аккаунт</button>
            </div>
          )
        } else {
          // User is logged in but has no profile
          dashboardContent = (
            <div>
              <p className="lead text-muted">Добро пожаловать, {user.name} </p>
              <p>You have not yet setup a profile.</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Создать профиль
              </Link>
            </div>
          )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Профиль</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
