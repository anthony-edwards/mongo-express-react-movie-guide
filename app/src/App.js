import React, { Component } from 'react';
import Table from './Table'
import './App.css';
import Movie from "@material-ui/icons/Videocam";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Anthony Edwards </h1>
        <h3> MOVIE GUIDE <Movie/> </h3>
        <Table />
      </div>
    );
  }
}

export default App;
