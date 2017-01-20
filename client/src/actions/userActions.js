import { GQL } from '../utils';

import { SET_SEARCH_QUERY, SET_LISTINGS, SET_TOKEN } from './actionTypes';
import { hashHistory } from 'react-router';
const jwtDecode = require('jwt-decode');

export const setSearchQuery = query => ({
  type: SET_SEARCH_QUERY,
  query,
})

export const setListings = listings => ({
  type: SET_LISTINGS,
  listings,
})

export const setToken = token => ({
  type: SET_TOKEN,
  token: jwtDecode(token),
})

export const performSearch = (query, size = 10, from = 0, navigate = true) => dispatch => {
  GQL(`{
    craigslist(query: "${query}", size: ${size}, from: ${from}) {
      results {
        title,
        price,
        imageUrls,
      }
    }
  }`).then(response => dispatch(setListings(response.craigslist.results)));

  navigate && dispatch(setSearchQuery(query));
  hashHistory.push('/results/' + encodeURIComponent(query));
};