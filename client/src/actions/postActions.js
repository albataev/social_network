import axios from 'axios';

import {
  POST_LOADING,
  DELETE_POST,
  GET_POST,
  ADD_POSTS,
  GET_POSTS,
  GET_ERRORS,
  CLEAR_ERRORS

} from "./types";

export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  console.log('[postActions addPost] Fired');
  axios.post('/api/posts', postData)
    .then(res => {
      console.log('[postActions addPost] SUCCESS', res.data);
      dispatch({
        type: ADD_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log('[postActions addPost] ERROR', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  console.log('[postActions addComment] Fired');
  axios.post(`/api/posts/comment/${postId}`, commentData)
    .then(res => {
      console.log('[postActions addComment] SUCCESS', res.data);
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      console.log('[postActions addComment] ERROR', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const deleteComment = (postId, commentId) => dispatch => {
  console.log('[postActions deleteComment] Fired');
  axios.delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => {
      console.log('[postActions deleteComment] SUCCESS', res.data);
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      console.log('[postActions deleteComment] ERROR', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const getPosts = () => dispatch => {
  console.log('[postActions getPosts] Fired');
  dispatch(setPostLoading());
  axios.get('/api/posts')
    .then(res => {
      console.log('[postActions getPosts] SUCCESS', res.data);
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log('[postActions getPosts] ERROR', err.response.data);
      dispatch({
        // not calling GET_ERRORS because no any form to display errors
        type: GET_POSTS,
        payload: null
      })
    })
};

export const getPost = (id) => dispatch => {
  console.log('[postActions getPosts] Fired');
  dispatch(setPostLoading());
  axios.get(`/api/posts/${id}`)
    .then(res => {
      console.log('[postActions getPosts] SUCCESS', res.data);
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    })
    .catch(err => {
      console.log('[postActions getPosts] ERROR', err.response.data);
      dispatch({
        // not calling GET_ERRORS because no any form to display errors
        type: GET_POSTS,
        payload: null
      })
    })
};

export const addLike = id => dispatch => {
  console.log('[postActions addLike] Fired');
  axios.post(`/api/posts/like/${id}`)
    .then(res => {
      console.log('[postActions removeLike] SUCCESS', res.data);
      // other option is to modify post in state
      dispatch(getPosts())
    })
    .catch(err => {
      console.log('[postActions addLike] ERROR', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const removeLike = id => dispatch => {
  console.log('[postActions removeLike] Fired');
  axios.post(`/api/posts/unlike/${id}`)
    .then(res => {
      console.log('[postActions removeLike] SUCCESS', res.data);
      // other option is to modify post in state
      dispatch(getPosts())
    })
    .catch(err => {
      console.log('[postActions removeLike] ERROR', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const deletePost = id => dispatch => {
  console.log('[postActions addPost] deletePost');
  dispatch(clearErrors());
  axios.delete(`/api/posts/${id}`)
    .then(res => {
      console.log('[postActions deletePost] SUCCESS', res.data);
      dispatch({
        // id so we can delete post in reducer locally
        type: DELETE_POST,
        payload: id
      })
    })
    .catch(err => {
      console.log('[postActions deletePost] ERROR', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const setPostLoading = () => {
  console.log('[postActions setPostLoading] Fired');
  return {
    type: POST_LOADING
  }
};

export const clearErrors = () => {
  console.log('[postActions clearErrors] Fired');
  return {
    type: CLEAR_ERRORS
  }
};
