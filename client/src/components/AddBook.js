import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorid: ""
    };
  }
  displayAuthors(){
    var data = this.props.getAuthorsQuery;
    if(data.loading) {
      return( <option disabled>Loading Authors...</option>)
    } else {
      return data.authors.map(author => {
        return( <option key={ author.id } value={ author.id }> {author.name}</option>)
      })
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorid: this.state.authorid
      }, 
      optimisticResponse: {
        __typename: "Mutation",
        addBook: {
          __typename: "Book",
          name: this.state.name,
          genre: this.state.genre,
          id: this.state.authorid
        }
      },
      update: (proxy, { data: { addBook } }) => {
      // Read the data from our cache for this query.
      const data = proxy.readQuery({ query: getBooksQuery });
      // Add our comment from the mutation to the end.
      data.books.push(addBook);
      // Write our data back to the cache.
      proxy.writeQuery({ query: getBooksQuery, data });
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }
  render() {

    return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>

        <div className="field">
          <label>Book name</label>
          <input type="text" onChange={ (e) => this.setState({name: e.target.value})}/>
        </div>

        <div className="field">
          <label>Genre</label>
          <input type="test" onChange={ (e) => this.setState({genre: e.target.value})}/>
        </div>

        <div className="field">
          <label>Author</label>
          <select onChange={ (e) => this.setState({authorid: e.target.value})}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);




