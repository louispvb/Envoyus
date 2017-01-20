import { GQL } from '../utils';

import * as A from './actionTypes';
import { hashHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import store from '../store';

console.log('STORE2 ', store.getState());

export const setSearchQuery = query => ({
  type: A.SET_SEARCH_QUERY,
  query,
})

export const setListings = listings => ({
  type: A.SET_LISTINGS,
  listings,
})

export const setToken = token => ({
  type: A.SET_TOKEN,
  token: jwtDecode(token),
})

export const setCities = cities => ({
  type: A.SET_CITIES,
  cities
})

export const selectCity = citySelection => ({
  type: A.SELECT_CITY,
  citySelection
})

export const setResultCount = resultCount => ({
  type: A.SET_RESULT_COUNT,
  resultCount
})



export const performSearch = (query, size = 20, from = 0, conditionRange = [-3, 3], priceRange = [0, 1500], navigate = true) => dispatch => {
  GQL(`{
    craigslist(query: "${query}", size: ${size}, from: ${from}, conditionRange: [${conditionRange}], priceRange: [${priceRange}]) {
      metaData {
        total
      }
      results {
        title
        price
        imageUrls
        location {
          lat
          lon
        }
        specs {
          condition
          screenSize
          year
          processor
          RAM
          hardDrive
          graphics
        }
        condition
      }
    }
  }`).then(response => {
    dispatch(setResultCount(response.craigslist.metaData.total))
    dispatch(setListings(response.craigslist.results))
  });

  navigate && dispatch(setSearchQuery(query));
  hashHistory.push('/results/' + encodeURIComponent(query));
};

const _setPriceFilter = (lower, upper) => ({
  type: A.SET_PRICE_FILTER,
  lower,
  upper,
})

const _setConditionFilter = (lower, upper) => ({
  type: A.SET_CONDITION_FILTER,
  lower,
  upper,
})

export const setPriceFilter = (lower, upper) => dispatch => {
  let state = store.getState();
  dispatch(_setPriceFilter(lower, upper));
  dispatch(performSearch(state.query, 20, 0, state.conditionRange, [lower, upper], false));
}


export const setConditionFilter = (lower, upper) => dispatch => {
  let state = store.getState();
  lower = (lower + 3) * 10 / 6
  upper = (upper + 3) * 10 / 6
  dispatch(_setConditionFilter(lower, upper));
  dispatch(performSearch(state.query, 20, 0, [lower, upper], state.priceRange, false));
}

export const fetchCities = _ => dispatch => {
  GQL(`{
    cities {
      cityName
      state
      lat
      long
    }
  }`).then(response => dispatch(setCities(response.cities)));
}