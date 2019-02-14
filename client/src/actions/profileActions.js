import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

// get current profile
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
        payload: null
      })
    })
};

// Profile loading
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
