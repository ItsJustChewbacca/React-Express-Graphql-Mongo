const graphql = require('graphql');
const _= require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data

var books = [
  { name: "hello", genre:"happy", id:'1' },
  { name: "goodbye", genre:"sad", id: '2' },
  { name: "React", genre:"fun", id: '3' }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        // code to get data from db / other source
        return _.find(books, {id: args.id});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})