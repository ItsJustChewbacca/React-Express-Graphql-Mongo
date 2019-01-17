import React, { Component } from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import { OfflineMutation } from '../helpers/offline';


class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "First",
      genre: "None",
      authorid: null
    };
  }
  displayAuthors(){
    var data = this.props.getAuthorsQuery;
    if(data.loading) {
      return( <option disabled>Loading Authors...</option>)
    } else {
      return data.authors.map(author => (<option key={ author.id } value={ author.id }> {author.name}</option>))
    }
  }

  render() {
    const { name, genre, authorid } = this.state;

    return (
      <OfflineMutation mutation={ addBookMutation } >
        {
          (addBook) => {
            return (
              <form id="add-book" onSubmit={(e) => {
                e.preventDefault()
                const id = Math.random();

                addBook({
                  variables: { name, genre, authorid },
                  update: updateAddBookMutation,
                  optimisticResponse: {
                    __optimistic: true,
                    __typename: "Mutation",
                    addBook: {
                      id,
                      name,
                      genre,
                      authorid,
                      __typename: "Book"
                    }
                  }
                });
              }}>
                <div className="field">
                  <label>Book name</label>
                  <input type="text" value={ this.state.name } onChange={ (e) => this.setState({name: e.target.value})}/>
                </div>

                <div className="field">
                  <label>Genre</label>
                  <input type="test" value={ this.state.genre } onChange={ (e) => this.setState({genre: e.target.value})}/>
                </div>

                <div className="field">
                  <label>Author</label>
                  <select value={ this.state.authorid } onChange={ (e) => this.setState({authorid: e.target.value})}>
                    <option>Select author</option>
                    { this.displayAuthors() }
                  </select>
                </div>

                <button>+</button>
              </form>
            )
          }
        }
      </OfflineMutation>
    );
  }
}

export const updateAddBookMutation = (proxy, { data: { addBook } }) => {
  const data = proxy.readQuery({ query: getBooksQuery });
  data.books.push(addBook);
  proxy.writeQuery( { query: getBooksQuery, data });
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);




