import axios from 'axios';

export const GQL = data => axios({
  method: 'post',
  url: '/graphql',
  data,
  headers: {
    'Content-Type': 'application/graphql'
  }})
  .then(response => response.data.data)
  .catch(err => {
    console.error('GraphQL request failed with error: ', err);
  });