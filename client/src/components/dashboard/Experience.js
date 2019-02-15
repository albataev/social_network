import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {

  onDeleteClick = (id) => {
    // e.preventDefault;
    console.log('Delete exp clicked', id);
    this.props.deleteExperience(id)
  };

  render() {
    const experience = this.props.experience.map(exp => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            С&nbsp;
            <Moment format={"YYYY.MM.DD"}>{exp.from}</Moment>
            &nbsp;по&nbsp;
            {exp.to!==null ? <Moment format={"YYYY.MM.DD"}>{exp.to}</Moment> :
            "настоящее время"}
          </td>
          <td>
            <button
            className="btn btn-danger"
            type="button"
            onClick={(key) => this.onDeleteClick(key)}>
            Удалить
          </button>
          </td>
        </tr>
      )
    );
    return (
      <div className="experience">
        <h4>Опыт работы:</h4>
        <table className="table">
          <thead></thead>
          <tbody>
          <tr>
            <th>Компания</th>
            <th>Позиция</th>
            <th>Период работы</th>
            <th></th>
          </tr>
            {experience}
          </tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
