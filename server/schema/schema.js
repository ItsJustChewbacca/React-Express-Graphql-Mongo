const graphql = require('graphql');
const _= require('lodash')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;


//dummy data

var books = [
  { name: "hello", genre:"happy", id:'1', authorid: "1" },
  { name: "goodbye", genre:"sad", id: '2', authorid: "2" },
  { name: "React", genre:"fun", id: '3', authorid: "3" },
  { name: "Mongo", genre:"sad", id:'4', authorid: "2" },
  { name: "Express", genre:"happy", id: '5', authorid: "3" },
  { name: "Redux", genre:"fun", id: '6', authorid: "3" }
]

var authors = [
  { name: "Luke", age: 24, id:'1' },
  { name: "Blue", age: 99, id: '2' },
  { name: "Mesa", age: 1, id: '3' }
]

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorid: parent.id })
      }
    }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        console.log(parent);
        return _.find(authors, { id: parent.authorid });
      }
    }
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
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})