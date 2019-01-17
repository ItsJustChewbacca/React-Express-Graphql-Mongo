import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  query books{
    books {
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  query authors{
    authors {
      name
      id
    }
  }
`

const addBookMutation = gql`
  mutation addBook($name: String!, $genre: String!, $authorid: ID!) {
    addBook(name: $name, genre: $genre, authorid: $authorid){
      id
      name
    }
  }
`
const getBookQuery = gql`
  query book($id: ID){
    book(id: $id) {
    id
    name
    genre
    author {
      id
      name
      age
      books {
        name
        id
      }
    }
  }
}
`
export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};