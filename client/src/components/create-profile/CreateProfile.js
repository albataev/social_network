import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions'

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    status: '',
    website: '',
    location: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if(displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            name="twitter"
            onChange={this.onChange}
            icon="fab fa-twitter"
            placeholder="Профиль Twitter"
            value={this.state.twitter}
            error={errors.twitter}
          />
          <InputGroup
            name="facebook"
            onChange={this.onChange}
            icon="fab fa-facebook"
            placeholder="Профиль facebook"
            value={this.state.facebook}
            error={errors.facebook}
          />
          <InputGroup
            name="linkedin"
            onChange={this.onChange}
            icon="fab fa-linkedin"
            placeholder="Профиль linkedin"
            value={this.state.linkedin}
            error={errors.linkedin}
          />
          <InputGroup
            name="youtube"
            onChange={this.onChange}
            icon="fab fa-youtube"
            placeholder="Профиль youtube"
            value={this.state.youtube}
            error={errors.youtube}
          />
          <InputGroup
            name="instagram"
            onChange={this.onChange}
            icon="fab fa-instagram"
            placeholder="Профиль instagram"
            value={this.state.instagram}
            error={errors.instagram}
          />
        </div>
      )
    }

    const options = [
      { label: '* Ваша профессия', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="h1 display-4 text-center">
                Создать профиль
              </h1>
              <p className="lead text-center">
                Наполните профиль информацией о себе
              </p>
              <small className="d-block pb-3">
                * = Обязательно к заполнению
              </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  onChange={this.onChange}
                  placeholder="* идентификатор профиля"
                  value={this.state.handle}
                  error={errors.handle}
                  info="Уникальный идентификатор профиля. Латинские буквы"
                />
                <SelectListGroup
                  name="status"
                  onChange={this.onChange}
                  placeholder="Чем занимаетесь?"
                  value={this.state.status}
                  error={errors.status}
                  options={options}
                  info="Чем вы занимаетесь?"
                />
                <TextFieldGroup
                  name="company"
                  onChange={this.onChange}
                  placeholder="Компания"
                  value={this.state.company}
                  error={errors.company}
                  info="Где работаете?"
                />
                <TextFieldGroup
                  name="website"
                  onChange={this.onChange}
                  placeholder="Website"
                  value={this.state.website}
                  error={errors.website}
                  info="Ваш website или компании"
                />
                <TextFieldGroup
                  name="location"
                  onChange={this.onChange}
                  placeholder="Где вы находитесь?"
                  value={this.state.location}
                  error={errors.location}
                  info="Страна, город и т.д."
                />
                <TextFieldGroup
                  name="skills"
                  onChange={this.onChange}
                  placeholder="Что умеете?"
                  value={this.state.skills}
                  error={errors.skills}
                  info="Навыки, через запятую (HTML, CSS и т.д.)"
                />
                <TextFieldGroup
                  name="githubusername"
                  onChange={this.onChange}
                  placeholder="Профиль на Github"
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  info="Хотите показать последние репозитории и профиль на Github?"
                />
                <TextAreaFieldGroup
                  name="bio"
                  onChange={this.onChange}
                  placeholder="Несколько слов о себе"
                  value={this.state.bio}
                  error={errors.bio}
                  info="Хотите рассказать о себе?"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                  }}
                    className=" btn btn-light">
                    Добавить профили соцсетей
                  </button>
                  <small className="d-block pb-3">
                    не обязательно
                  </small>
                </div>
                {socialInputs}
                <input className="btn btn-info btn-block" type="submit" value="Сохранить"/>
              </form>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
