const BASE_PORT = 3000;

module.exports = {
  APP_NAME: 'envoyus',
  GATEWAY_SERVER: {
    PORT: process.env.PORT || (process.env.NODE_ENV === 'production' ? 80 : BASE_PORT),
    ADDRESS: process.env.NODE_ENV === 'production' ? '69.30.232.2' : '127.0.0.1'
  },
  CENTRAL_DB: {
    DATABASE: 'envoyus_db',
    HOST: '172.17.0.3' || 'localhost',
    PORT: 5432
  },
  LOGIN_SERVICE: {
    PORT: process.env.LOGIN_PORT || (process.env.NODE_ENV === 'production' ? 80 : BASE_PORT + 1),
    DB_URI: 'mongodb://localhost/authentication',
    ADDRESS: process.env.NODE_ENV === 'production' ? '69.30.232.3' : '127.0.0.1'
  },
  PRICECHECK_SERVER_PORT: 3002,
  // TODO: this ^^^ should follow the outline below
  PRICECHECK_SERVER: {
    PORT: 3002
  },
  PRODUCT_SEARCH: {
    PORT: 3015
  },
  ELASTIC_SEARCH_URI: 'http://localhost:9200'
}
