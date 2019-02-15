import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

  onDeleteClick = (id) => {
    console.log('Delete exp clicked', id);
    this.props.deleteEducation(id)
  };

  render() {
    let education = '';
    if(this.props.education) {
      education = this.props.education.map(exp => (
          <tr key={exp._id}>
            <td>{exp.school}</td>
            <td>{exp.degree}</td>
            <td>{exp.fieldofstudy}</td>
            <td>
              С&nbsp;
              <Moment format={"YYYY.MM.DD"}>{exp.from}</Moment>
              &nbsp;по&nbsp;
              {exp.to !== null ? <Moment format={"YYYY.MM.DD"}>{exp.to}</Moment> :
                "настоящее время"}
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={(key) => this.onDeleteClick(key)}>
                Удалить
              </button>
            </td>
          </tr>
        )
      );
    }
    return (
      <div className="education">
        <h4>Образование:</h4>
        <table className="table">
          <thead></thead>
          <tbody>
          <tr>
            <th>Учебное заведение</th>
            <th>Диплом</th>
            <th>Специализация</th>
            <th>Период работы</th>
            <th></th>
          </tr>
          {education}
          </tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(withRouter(Education));
