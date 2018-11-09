const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express();

// Connet to Mlab instance
mongoose.connect('mongodb://Luke:redux11@ds121192.mlab.com:21192/gql');

mongoose.connection.once('open', () => {
  console.log("Connected to Database")
})

app.use('/graphql', graphqlHTTP ({
  schema // ES6
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000')
})