import { GQL } from '../utils';

import * as A from './actionTypes';
import { hashHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

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

export const setPriceFilter = (lower, upper) => ({
  type: A.SET_PRICE_FILTER,
  lower,
  upper,
})

export const setConditionFilter = (lower, upper) => ({
  type: A.SET_CONDITION_FILTER,
  lower,
  upper,
})

export const performSearch = (query, size = 20, from = 0, navigate = true) => dispatch => {
  GQL(`{
    craigslist(query: "${query}", size: ${size}, from: ${from}) {
      metaData {
        total
      }
      results {
        title,
        price,
        imageUrls,
        lat,
        long,
        specs
      }
    }
  }`).then(response => {
    dispatch(setResultCount(response.craigslist.metaData.total))
    dispatch(setListings(response.craigslist.results))
  });

  navigate && dispatch(setSearchQuery(query));
  hashHistory.push('/results/' + encodeURIComponent(query));
};

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