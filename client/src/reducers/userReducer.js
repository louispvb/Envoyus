import {
  SET_SEARCH_QUERY,
  SET_LISTINGS,
  SET_TOKEN,
} from '../actions/actionTypes';

const userReducer = (state = {
  query: '',
  listings: [],
  token: { email: '', iat: 0, id: '', name: '' },
}, action) => {
  const updateState = {
    SET_SEARCH_QUERY: { query: action.query },
    SET_LISTINGS: { listings: action.listings },
    SET_TOKEN: { token: action.token }
  }
  return {...state, ...updateState[action.type]}
}

export default userReducer;