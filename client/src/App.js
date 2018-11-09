import React, { Component } from 'react';

//components
import BookList from './components/Booklist';


class App extends Component {
  render() {
    return (
      <div id="main">
      <h1> Luke's React </h1>
      <BookList/>
      </div>
    );
  }
}

export default App;
