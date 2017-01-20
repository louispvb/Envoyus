import * as A from '../actions/actionTypes';

const userReducer = (state = {
  query: '',
  listings: [],
  token: { email: '', iat: 0, id: '', name: '' },
  cities: [],
  citySelection: 0,
  resultCount: 0,
  conditionFilter: {
    lower: 0,
    upper: 10,
  },
  priceFilter: {
    lower: 0,
    upper: 1000,
  },
}, action) => {
  const updateState = {
    [A.SET_SEARCH_QUERY]: { query: action.query },
    [A.SET_LISTINGS]: { listings: action.listings },
    [A.SET_TOKEN]: { token: action.token },
    [A.SET_CITIES]: { cities: action.cities },
    [A.SELECT_CITY]: { citySelection: action.citySelection },
    [A.SET_RESULT_COUNT]: { resultCount: action.resultCount },
    [A.SET_CONDITION_FILTER]: { 
      conditionFilter: {
        lower: action.lower,
        upper: action.upper,
      }
    },
    [A.SET_PRICE_FILTER]: {
      priceFilter: {
        lower: action.lower,
        upper: action.upper,
      }
    }
  }
  return {...state, ...updateState[action.type]}
}

export default userReducer;