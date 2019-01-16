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
  const id = Math.random()
  const mutation = 'addBook'


  const params = {
   variables: {
     name: this.state.name,
     genre: this.state.genre,
     authorid: this.state.authorid
   },
   optimisticResponse: {
     __optimistic: true,
     __typename: "Mutation",
     addBook: {
       __typename: "Book",
       name: this.state.name,
       genre: this.state.genre,
       id: this.state.authorid
     }
   },
   update: updateAddBookMutation,
   refetchQueries: [{ query: getBooksQuery }]
    };

    OfflineHelper.store({ id, params, mutation })
    this.props.addBookMutation(params)
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
  export const updateAddBookMutation = (proxy, { data: { addBook } }) => {
    const data = proxy.readQuery({ query: getBooksQuery });
    data.books.push(addBook);
    proxy.writeQuery( { query: getBooksQuery, data });
  }

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);




