import React, {Component} from 'react';
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  };

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    })
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className="btn btn-light">
                Назад
              </Link>
              <h1 className="display-4 text-center">
                Добавьте свой опыт работы
              </h1>
              <p className="lead text-center">
                Кем вы работали или работаете сейчас?
              </p>
              <small className="d-block pb-3">
                * = обязательное поле
              </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="company"
                  onChange={this.onChange}
                  placeholder="* Место работы"
                  value={this.state.company}
                  error={errors.company}
                  info="* Название места работы"
                />
                <TextFieldGroup
                  name="title"
                  onChange={this.onChange}
                  placeholder="Должность"
                  value={this.state.title}
                  error={errors.title}
                  info="* Должность"
                />
                <TextFieldGroup
                  name="location"
                  onChange={this.onChange}
                  placeholder="Местоположение"
                  value={this.state.location}
                  error={errors.location}
                  info="Местоположение"
                />
                <h6>Работал с</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  onChange={this.onChange}
                  placeholder="Дата начала работы"
                  value={this.state.from}
                  error={errors.from}
                  info="Дата начала работы"
                />
                <h6>По</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  onChange={this.onChange}
                  placeholder="Дата окончания работы"
                  value={this.state.to}
                  error={errors.to}
                  info="Дата окончания работы"
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                  />
                  <label htmlFor="current" className="form-check-label">
                    Сейчас работаю
                  </label>
                </div>
                  <TextAreaFieldGroup
                    name="description"
                    onChange={this.onChange}
                    placeholder="Описание должностных обязанностей"
                    value={this.state.description}
                    error={errors.description}
                    info="Расскажите о своем опыте работы"
                  />
                  <input type="submit" value="Сохранить" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps,
  { addExperience })(withRouter(AddExperience));
