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
          <h1></h1>
        </header>
        {/* <div><Example name="Sandra" /></div> */}
        <div class="container" id="visualization1">

        </div>

        <div class="container" id="visualization2">
          <Visualization2 name="Sandra" />
        </div>
      </div>
    )
  }
}

export default App
