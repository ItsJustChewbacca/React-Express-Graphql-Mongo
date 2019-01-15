import React, { Component } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { RetryLink } from 'apollo-link-retry'
import { concat } from 'apollo-link'
import { ApolloProvider } from 'react-apollo';
import { persistCache } from 'apollo-cache-persist';
import BookList from './components/Booklist';
import AddBook from './components/AddBook';

const retry = new RetryLink({ attempts : { max : Infinity } }) 
const http = new HttpLink({ uri : 'http://localhost:4000/graphql' })
const link = concat(retry, http)
const cache = new InMemoryCache()
const storage = window.localStorage

// apollo client setup
// Construct the client with our new link
const client = new ApolloClient({ cache, link })

// Use an InMemoryCache, but keep it synced to localStorage

export const waitOnCache = persistCache({ cache, storage })

// Use concat to add RetryLink between HttpLink and Apollo client

//components

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1> Luke's React </h1>
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

