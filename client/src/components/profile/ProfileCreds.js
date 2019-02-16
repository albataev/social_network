import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key ={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY.MM.DD">{exp.from}</Moment> -
          {exp.to === null ?
            (' сейчас работаю') :
            (<Moment format="YYYY.MM.DD">{exp.to}</Moment>)
          }
        </p>
        <p><strong>Должность: </strong>{exp.title}</p>
        {isEmpty(exp.location) ?
          <p><span><strong>Местоположение: </strong>не указано</span></p> :
          <p><span><strong>Местоположение: </strong>{exp.location}</span></p>
        }
        {isEmpty(exp.description) ?
          <p><span><strong>Описание: </strong>не указано</span></p> :
          <p><span><strong>Описание: </strong>{exp.description}</span></p>
        }
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key ={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY.MM.DD">{edu.from}</Moment> -
          {edu.to === null ?
            (' сейчас учусь') :
            (<Moment format="YYYY.MM.DD">{edu.to}</Moment>)
          }
        </p>
        <p><strong>Диплом: </strong>{edu.degree}</p>
        <p><span><strong>Специализация: </strong>{edu.fieldofstudy}</span></p>
        {isEmpty(edu.description) ?
          <p><span><strong>Описание: </strong>не указано</span></p> :
          <p><span><strong>Описание: </strong>{edu.description}</span></p>
        }
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Опыт работы</h3>
          {expItems.length > 0 ?
            <ul className="list-group">
              {expItems}
            </ul>
            : (<p className="text-center">Опыт не указан</p>)
          }
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Образование</h3>
          {eduItems.length > 0 ?
            <ul className="list-group">
              {eduItems}
            </ul>
            : (<p className="text-center">Образование не указано</p>)
          }
        </div>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired
};

export default ProfileCreds;
