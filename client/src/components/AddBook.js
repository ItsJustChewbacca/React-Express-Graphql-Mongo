import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import { addOfflineMutation, proxyUpdateForId } from '../helpers/offline';

class AddBook extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: "",
      genre: "",
      authorid: ""
    };
  }

  submitForm(e) {
    e.preventDefault();

    const id = Math.random();
    const { name, genre, authorid } = this.state;

    const params = {
      variables: { name, genre, authorid },
      update: proxyUpdateForId(id),
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
    };

    addOfflineMutation({ id, params, mutation: addBookMutation });

    this.props.addBookMutation(params);
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
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>Book name</label>
          <input type="text" value={ name } onChange={ (e) => this.setState({name: e.target.value})}/>
        </div>

        <div className="field">
          <label>Genre</label>
          <input type="test" value={ genre } onChange={ (e) => this.setState({genre: e.target.value})}/>
        </div>

        <div className="field">
          <label>Author</label>
          <select value={ authorid } onChange={ (e) => this.setState({authorid: e.target.value})}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
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
