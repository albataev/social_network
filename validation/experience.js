const Validator = require('validator');
const isEmpty = require('./is-empty');
//     title: req.body.title,
//     company: req.body.company,
//     location: req.body.location,
//     from: req.body.from,
//     to: req.body.to,
//     current: req.body.current,
//     description: req.body.description

const validateExperienceInput = ((data) => {
    let  errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.title)) {
        console.log('Job title field is required');
        errors.title = 'Job title field is required';
    }

    if(Validator.isEmpty(data.company)) {
        console.log('Company field is required');
        errors.company = 'Company field is required';
    }

    if(Validator.isEmpty(data.from)) {
        console.log('From date field is required');
        errors.from = 'From date field is required';
    }


    return {
        errors: errors,
        isValid: isEmpty(errors)
        // isValid: true
    }
});

module.exports = validateExperienceInput;
