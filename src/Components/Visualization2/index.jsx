import React, { Component } from 'react'
import * as d3 from 'd3'
import style from './style.css'

class Visualization2 extends Component {
  static defaultProps = {
    svgId: 'canvas',
    path: `${process.env.PUBLIC_URL}/StrassenverkehrsunfaelleMaengel.csv`,
    canvHeight: 550,
    canvWidth: 800,
    margin: { top: 50, right: 20, bottom: 50, left: 60 },
    height: 550 - 50 - 50,
    width: 800 - 60 - 20,
  }

  constructor(props) {
    super(props)
    this.state = {
      einfluss1: "A: Zustand des Lenkers oder Fussgaengers",
      objektart1: "Personenwagen",
      strassenart1: "Autobahn",
      unfallschwere1: "Unfall mit leicht Verletzten",
      jahr1: 1994,
      data: null,
    }
  }

  componentDidMount() {
    d3.csv(this.props.path)
      .then(data => {
        this.setState({ data: data }) // now this.state.data can be used in the render() function;
      })
  }

  render() {
    var exampleData = [
      { "count": 200 },
      { "count": 300 },
      { "count": 400 },
      { "count": 500 }
    ]

    const { svgId, canvHeight, canvWidth, margin, width, height } = this.props
    const { data, einfluss1, objektart1, strassenart1, unfallschwere1 } = this.state

    if (null !== data) {

      // TRY OUT HERE
      let filteredData = data.filter(row => row['Mangel oder Einfluss'] === einfluss1)
      filteredData = filteredData.filter(row => row['Objektart'] === objektart1)
      filteredData = filteredData.filter(row => row['Strassenart'] === strassenart1)
      filteredData = filteredData.filter(row => row['Unfallschwere'] === unfallschwere1)
      console.log("Show me some data, Unfallschwere: " + filteredData)
      let moreFilteredData = filteredData.filter(row => row['Unfalltyp'] === 'Schleuder-, Selbstunfall')
      //console.log("Show me some data, nur noch 1 Zeile mit Unfalltyp: " + filteredData)
      console.log("Show me some data, 1 Feld: " + moreFilteredData[0]['1992'])

      // Das brauchen wir nicht, oder?
      const einfluss = d3.extent(data, d => d["Mangel oder Einfluss"])
      const objektart = d3.extent(data, d => d["Objektart"])
      const strassenart = d3.extent(data, d => d["Strassenart"])
      const unfallschwere = d3.extent(data, d => d["Unfallschwere"])
      const jahr1992 = d3.extent(data, d => d["1992"])

      // create scale for x direction
      const xScale = d3.scaleTime()
        .domain([new Date("1991"), new Date("2016")])
        .rangeRound([0, width])

      // create scale for y direction
      const yScale = d3.scaleLinear()
        .domain([0, 800])
        .rangeRound([height, 0])

      // select chart-area
      const g = d3.select("#chart-area")

      // define the line
      var valueline = d3.line()
        .x((d, i) => { return xScale(new Date('' + (1992 + i))) })
        .y((d, i) => { return yScale(d) })
        .curve(d3.curveCatmullRom)

      // create xAxis
      const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"))
      g.select("#axisX").call(xAxis)

      // create yAxis
      const yAxis = d3.axisLeft(yScale)
      g.select("#axisY").call(yAxis) // evtl. umschreiben, so dass select nicht mehr verwendet wird

      // Add label for yAxis
      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (height / 2))
        .attr("y", 0 - margin.left)
        .attr("class", "label")
        .attr("dy", "1em")
        .attr("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .text("Anzahl Unfälle ")

      // Add label for xAxis
      g.append("text")
        .attr("x", width / 2)
        .attr("y", height + 25)
        .attr("class", "label")
        .attr("dy", "1em")
        .attr("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .text("Jahre")

      const theData = Object.values(filteredData[1]).slice(0, 2016 - 1992)
      
      // Add the circles
      g.selectAll("circle")
        .data(theData)
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", (d, i) => { /*debugger;*/ return xScale(new Date('' + (1992 + i))) })
        .attr("cy", (d, i) => { /*debugger;*/ return yScale(d) })
        .style("fill", "#F0F0F0")

      // Add the valueline path.
      g.append("path")
        .data([theData])
        .attr("class", "lines")
        .attr("stroke", "#F0F0F0")
        .attr("stroke-width", "1.5px")
        .attr("fill", "none")
        .attr("d", valueline)
    }


    return (
      <div className="container" id="visualization2">
        <h2>Grafik 2</h2>
        <div id="selection-area">
          <div class="selection-group">
            <h3 class="selection-group-title">Objektart</h3>
            <div class="selection-items" id="Objektart" role="tablist">
              <a class="item" id="Personenwagen">Personenwagen</a>
              <a class="item" id="Personentransportfahrzeuge">Personentransportfahrzeuge</a>
              <a class="item" id="Sachentransportfahrzeuge">Sachentransportfahrzeuge</a>
              <a class="item" id="Kleinmotorrad">Kleinmotorrad</a>
              <a class="item" id="Motorrad bis 125 ccm">Motorrad bis 125 ccm</a>
              <a class="item" id="Motorrad über 125 ccm">Motorrad über 125 ccm</a>
              <a class="item" id="Fahrrad">Fahrrad</a>
              <a class="item" id="Motorfahrrad">Motorfahrrad</a>
              <a class="item" id="FussgängerIn">FussgängerIn</a>
              <a class="item" id="Anderes nicht motorisiertes Fahrzeug">Anderes nicht motorisiertes Fahrzeug</a>
              <a class="item" id="Andere und unbekannte Fahrzeuge">Andere und unbekannte Fahrzeuge</a>
          
            </div>
          </div>
          <div class="selection-group">
            <h3 class="selection-group-title">Unfallschwere</h3>
            <div class="selection-items" id="Unfallschwere" role="tablist">
              <a class="item" id="Unfall mit leicht Verletzten">Unfall mit leicht Verletzten</a>
              <a class="item" id="Unfall mit schwer Verletzten">Unfall mit schwer Verletzten</a>
              <a class="item" id="Unfall mit Getoeteten">Unfall mit Getöteten</a>  
            </div>
          </div>
          <div class="selection-group">
            <h3 class="selection-group-title">Strassenart</h3>
            <div class="selection-items" id="Strassenart" role="tablist">
              <a class="item" id="Autobahn">Autobahn</a>
              <a class="item" id="Autostrasse">Autostrasse</a>
              <a class="item" id="Hauptstrasse">Hauptstrasse</a>
              <a class="item" id="Nebenstrasse">Nebenstrasse</a>
              <a class="item" id="Andere Strasse">Andere Strasse</a>
            </div>
          </div>
          <div class="selection-group">
            <h3 class="selection-group-title">Unfalltyp</h3>
            <div class="selection-items" id="Unfalltyp" role="tablist">
              <a class="item" id="Fussgaengerunfall">Fussgängerunfall</a>
              <a class="item" id="Schleuder-, Selbstunfall">Schleuder-, Selbstunfall</a>
              <a class="item" id="Beim Kreuzen (in Laengsrichtung)">Beim Kreuzen (in Längsrichtung)</a>
              <a class="item" id="Ueberholunfall">Überholunfall</a>
              <a class="item" id="Auffahrunfall">Auffahrunfall</a>
              <a class="item" id="Beim Vorbeifahren, Fahrstreifenwechsel">Beim Vorbeifahren, Fahrstreifenwechsel</a>
              <a class="item" id="Beim Richtungswechsel (mit Abbiegen)">Beim Richtungswechsel (mit Abbiegen)</a>
              <a class="item" id="Beim Queren (ohne Abbiegen)">Beim Queren (ohne Abbiegen)</a>
              <a class="item" id="Tierunfall">Tierunfall</a>
              <a class="item" id="Andere">Andere</a>
            </div>
          </div>
        </div>
        <svg id={svgId} width={canvWidth} height={canvHeight} style={{ align: 'center' }}>
          <g id="chart-area" transform={`translate(${margin.left},${margin.top})`}>
            <g id="axisX" className="axis" transform={`translate(0,${height})`} />
            <g id="axisY" className="axis" />
          </g>
        </svg>
      </div>
    )
  }
}

export default Visualization2
