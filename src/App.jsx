import React, { Component } from 'react'
import './App.css'

import Visualization2 from './Components/Visualization2'
import MapsVisualisation from './Components/MapsVisualisation'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Strassenverkehrsunfälle in der Schweiz</h1>
        </header>
        <div className="inner">
          <MapsVisualisation className="container" id="visualization1" />
          <hr class="divider"/>
          <Visualization2 />
        </div>
        <div id="mapTooltip" className="tooltip" />
      </div>
    )
  }
}

export default App
