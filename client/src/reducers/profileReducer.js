import {CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function (state = initialState, action) {
  switch(action.type) {
    case PROFILE_LOADING:
      console.log('[profileReducer PROFILE_LOADING fired]');
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      console.log('[profileReducer GET_PROFILE fired]', action.payload);
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
      case CLEAR_CURRENT_PROFILE:
      console.log('[profileReducer CLEAR_CURRENT_PROFILE fired]');
      return {
        ...state,
        profile: null
      };
    default:
      return state
  }
};

