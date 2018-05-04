import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Example from './Components/Example'
import Visualization2 from './Components/Visualization2'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.jsx</code> and save to reload.
        </p>
        <div>
          <Example name="Sandra" />
        </div>
        <div id="visualization2">
          <Visualization2 name="Sandra" />
        </div>
      </div>
    )
  }
}

export default App
