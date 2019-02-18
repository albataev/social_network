import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES,
  CLEAR_ERRORS
}
  from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res => {
      console.log('[profileActions getCurrentProfile] SUCCESS', res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      console.log('[profileActions getCurrentProfile] ERROR', err.response.data);
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    })
};

// get Profile By Handle

export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
    .then(res => {
      console.log('[profileActions getProfileByHandle] SUCCESS', res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      console.log('[profileActions getProfileByHandle] ERROR', err.response.data);
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    })
};

export const createProfile = (profileData, history) => dispatch => {
  console.log('[profileActions createProfile] profileData', profileData);
  axios.post('/api/profile', profileData)
    .then(res => {
      console.log('[profileActions createProfile] SUCCESS', res.data);
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push('/dashboard')
    })
    .catch(err => {
      console.log('[profileActions createProfile] ERROR', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const deleteAccount = () => dispatch => {
  if(window.confirm('Восстановить аккаунт будет нельзя. Продолжить?')) {
    axios.delete('/api/profile')
      .then(res => {
        console.log('[profileActions deleteAccount] SUCCESS', res.data);
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      })
      .catch(err => {
        console.log('[profileActions deleteAccount] ERROR', err.response.data);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      })
  }
};

export const addExperience = (expData, history) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/profile/experience', expData)
    .then(res => {
      console.log('[profileActions addExperience] SUCCESS', res.data);
      history.push('/dashboard')
    })
    .catch(err => {
      console.log('[profileActions addExperience] ERROR', err.response.data);
      console.log('[profileActions addExperience] payload', expData);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const deleteExperience = (id) => dispatch => {
  axios.delete(`/api/profile/experience/${id}`)
    .then(res => {
      console.log('[profileActions deleteExperience] SUCCESS', res.data);
      // fetch updated profile
      dispatch({
        type: GET_PROFILE,
        payload: res.data
        });
    })
    .catch(err => {
      console.log('[profileActions deleteExperience] ERROR', err.response.data);
      console.log('[profileActions deleteExperience] payload', id);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const addEducation = (eduData, history) => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/profile/education', eduData)
    .then(res => {
      console.log('[profileActions addEducation] SUCCESS', res.data);
      history.push('/dashboard')
    })
    .catch(err => {
      console.log('[profileActions addEducation] ERROR', err.response.data);
      console.log('[profileActions addEducation] payload', eduData);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const deleteEducation = (id) => dispatch => {
  axios.delete(`/api/profile/education/${id}`)
    .then(res => {
      console.log('[profileActions deleteEducation] SUCCESS', res.data);
      // fetch updated profile
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('[profileActions deleteEducation] ERROR', err.response.data);
      console.log('[profileActions deleteEducation] payload', id);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get("/api/profile/all")
    .then(res => {
      console.log('[profileActions getProfiles] SUCCESS', res.data);
      // fetch updated profile
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log('[profileActions getProfiles] ERROR', err.response.data);
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    })
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
};

export const clearErrors = () => {
  console.log('[profileActions clearErrors] Fired');
  return {
    type: CLEAR_ERRORS
  }
};
