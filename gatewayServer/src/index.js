const express = require('express');
const compression = require('compression');
const path = require('path');
const config = require('../../config/config').GATEWAY_SERVER;
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');
const schema = require('./schema.js');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(compression());
app.use(express.static(path.join(__dirname, '../../client/dist')));

let root = {hello: () => 'Hello moto'};

app.use('/graphql', graphqlHTTP({
  schema,
  // rootValue: root,
  graphiql: true
}));

app.listen(config.PORT, config.ADDRESS, () => console.log('Gateway listening on *:' + config.PORT));
