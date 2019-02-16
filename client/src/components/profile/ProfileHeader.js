import React, {Component} from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {

    const { profile } = this.props;
    let faIconClassnameStart = 'fab fa-';

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p
                className="lead text-center">
                {profile.status} {(isEmpty(profile.company) ?
                null :
                (<span>at {profile.company}</span>))}
              </p>
              {(isEmpty(profile.location) ?
                null :
                <p>{profile.location}</p>)}
              {(isEmpty(profile.website) ?
                null :
                (<a className="text-white p-2" href={profile.website} target="_blank">
                  <i className="fas fa-globe fa-2x"></i>
                </a>))}
              {!isEmpty(profile.social) ?
                Object.keys(profile.social).filter((key) =>
                  (!isEmpty(profile.social[key])))
                  .map(item => {
                  return (
                    <a key={item} className="text-white p-2" href={profile.social[item]}>
                      <i className={faIconClassnameStart + item}></i>
                    </a>
                  )}) :
                null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
