import {
  SET_SEARCH_QUERY,
  SET_LISTINGS,
} from '../actions/actionTypes';

const userReducer = (state = {
  query: '',
  listings: [],
}, action) => {
  const updateState = {
    SET_SEARCH_QUERY: { query: action.query },
    SET_LISTINGS: { listings: action.listings },
  }
  return {...state, ...updateState[action.type]}
}

export default userReducer;