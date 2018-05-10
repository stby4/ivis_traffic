import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Example from './Components/Example'
import Visualization2 from './Components/Visualization2'
import MapsVisualisation from './Components/MapsVisualisation'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Strassenverkehrsunfälle in der Schweiz</h1>
        </header>
        <div className="inner">
          <MapsVisualisation className="container" id="visualization1" />

          <div className="container" id="visualization2">
            <h2>Grafik 2</h2>
            <Visualization2 />
          </div>
        </div>
        <footer className="App-footer"></footer>
      </div>
    )
  }
}

export default App
