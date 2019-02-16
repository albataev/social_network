import React, {Component} from 'react';
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history);
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
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className="btn btn-light">
                Назад
              </Link>
              <h1 className="display-4 text-center">
                Добавить образование или курсы
              </h1>
              <p className="lead text-center">
                Где учились или учитесь сейчас?
              </p>
              <small className="d-block pb-3">
                * = обязательное поле
              </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="school"
                  onChange={this.onChange}
                  placeholder="* Место учебы"
                  value={this.state.school}
                  error={errors.school}
                  info="* Название места учебы"
                />
                <TextFieldGroup
                  name="degree"
                  onChange={this.onChange}
                  placeholder="Диплом, сертификат"
                  value={this.state.degree}
                  error={errors.degree}
                  info="* Название или описание документа об образовании (магистр, бакалавр и т.д.)"
                />
                <TextFieldGroup
                  name="fieldofstudy"
                  onChange={this.onChange}
                  placeholder="Специализация"
                  value={this.state.fieldofstudy}
                  error={errors.fieldofstudy}
                  info="* Название специализации или факультета"
                />
                <h6>Учился с</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  onChange={this.onChange}
                  placeholder="Дата начала обучения"
                  value={this.state.from}
                  error={errors.from}
                  info="* Дата начала обучения"
                />
                <h6>По</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  onChange={this.onChange}
                  placeholder="Дата окончания обучения"
                  value={this.state.to}
                  error={errors.to}
                  info="Дата окончания обучения"
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
                    Сейчас учусь
                  </label>
                </div>
                <TextAreaFieldGroup
                  name="description"
                  onChange={this.onChange}
                  placeholder="Описание программы обучения, дисциплин"
                  value={this.state.description}
                  error={errors.description}
                  info="Расскажите о своих знаниях, приобретенных в процессе обучения"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
