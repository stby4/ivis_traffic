import React, { Component } from 'react'
import * as d3 from 'd3'
import style from './style.css'

class Visualization2 extends Component {
  static defaultProps = {
    svgId: 'canvas',
    path: `${process.env.PUBLIC_URL}/StrassenverkehrsunfaelleMaengel.csv`,
    canvHeight: 720,
    canvWidth: 1100,
    margin: { top: 50, right: 15, bottom: 50, left: 50 },
    height: 720 - 50 - 50,
    width: 1100 - 50 - 15,
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
    const { svgId, canvHeight, canvWidth, margin, width, height } = this.props
    const { data, einfluss1, objektart1, strassenart1, unfallschwere1 } = this.state

    if (null !== data) {

      // TRY OUT HERE
      let filteredData = data.filter(row => row['Mangel oder Einfluss'] === einfluss1)
       filteredData = filteredData.filter(row => row['Objektart'] === objektart1)
      let filteredData_3 = filteredData.filter(row => row['Strassenart'] === strassenart1)
      let filteredData_4 = filteredData.filter(row => row['Unfallschwere'] === unfallschwere1)
      let filteredData_5 = filteredData.filter(row => row['Unfalltyp'] === 'Schleuder-, Selbstunfall')
      console.log("Show me some data, Unfallschwere: " + filteredData_4)
      console.log("Show me some data, nur noch 1 Zeile mit Unfalltyp: " + filteredData_5)
      console.log("Show me some data, 1 Feld: " + filteredData_5[0]['1992'])

      // Das brauchen wir nicht, oder?
      const einfluss = d3.extent(data, d => d["Mangel oder Einfluss"])
      const objektart = d3.extent(data, d => d["Objektart"])
      const strassenart = d3.extent(data, d => d["Strassenart"])
      const unfallschwere = d3.extent(data, d => d["Unfallschwere"])
      const jahr1992 = d3.extent(data, d => d["1992"])


      // create scale for x direction
      const xScale = d3.scaleTime()
        .domain([new Date("1992"), new Date("2016")])
        .rangeRound([2, width])

      // create scale for y direction
      const yScale = d3.scaleLinear()
        .domain([0, 600])
        .rangeRound([height-2, 0])

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


      for (let i in filteredData) {
        const theData = Object.values(filteredData[i]).slice(0, 2016 - 1992 + 1)
      
        // Add the circles
        g.selectAll("circle")
          .data(theData)
          .enter()
          .append("circle")
          .attr("r", 4)
          .attr("cx", (d, i) => { return xScale(new Date('' + (1992 + i))) })
          .attr("cy", (d, i) => { return yScale(d) })
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
    }



    return (
      <div className="container" id="visualization2">
        
        <h2>Grafik 2</h2>
        
        <div id="selection-area">
          <div class="selection-group">
            <h3 class="selection-group-title">Objektart</h3>
            <select size="3" class="selection-items" id="Objektart">
              <option class="item" id="Personenwagen">Personenwagen</option>
              <option class="item" id="Personentransportfahrzeuge">Personentransportfahrzeuge</option>
              <option class="item" id="Sachentransportfahrzeuge">Sachentransportfahrzeuge</option>
              <option class="item" id="Kleinmotorrad">Kleinmotorrad</option>
              <option class="item" id="Motorrad bis 125 ccm">Motorrad bis 125 ccm</option>
              <option class="item" id="Motorrad über 125 ccm">Motorrad über 125 ccm</option>
              <option class="item" id="Fahrrad">Fahrrad</option>
              <option class="item" id="Motorfahrrad">Motorfahrrad</option>
              <option class="item" id="FussgängerIn">FussgängerIn</option>
              <option class="item" id="Anderes nicht motorisiertes Fahrzeug">Anderes nicht motorisiertes Fahrzeug</option>
              <option class="item" id="Andere und unbekannte Fahrzeuge">Andere und unbekannte Fahrzeuge</option>
            </select>
          </div>
          <div class="selection-group">
            <h3 class="selection-group-title">Unfallschwere</h3>
            <select size="3" class="selection-items" id="Unfallschwere">
              <option class="item" id="Unfall mit leicht Verletzten">Unfall mit leicht Verletzten</option>
              <option class="item" id="Unfall mit schwer Verletzten">Unfall mit schwer Verletzten</option>
              <option class="item" id="Unfall mit Getoeteten">Unfall mit Getöteten</option>  
            </select>
          </div>
          <div class="selection-group">
            <h3 class="selection-group-title">Strassenart</h3>
            <select size="3" class="selection-items" id="Strassenart">
              <option class="item" id="Autobahn">Autobahn</option>
              <option class="item" id="Autostrasse">Autostrasse</option>
              <option class="item" id="Hauptstrasse">Hauptstrasse</option>
              <option class="item" id="Nebenstrasse">Nebenstrasse</option>
              <option class="item" id="Andere Strasse">Andere Strasse</option>
            </select>
          </div>
          <div class="selection-group">
            <h3 class="selection-group-title">Unfalltyp</h3>
            <select size="3" class="selection-items" id="Unfalltyp">
              <option class="item" id="Fussgaengerunfall">Fussgängerunfall</option>
              <option class="item" id="Schleuder-, Selbstunfall">Schleuder-, Selbstunfall</option>
              <option class="item" id="Beim Kreuzen (in Laengsrichtung)">Beim Kreuzen (in Längsrichtung)</option>
              <option class="item" id="Ueberholunfall">Überholunfall</option>
              <option class="item" id="Auffahrunfall">Auffahrunfall</option>
              <option class="item" id="Beim Vorbeifahren, Fahrstreifenwechsel">Beim Vorbeifahren, Fahrstreifenwechsel</option>
              <option class="item" id="Beim Richtungswechsel (mit Abbiegen)">Beim Richtungswechsel (mit Abbiegen)</option>
              <option class="item" id="Beim Queren (ohne Abbiegen)">Beim Queren (ohne Abbiegen)</option>
              <option class="item" id="Tierunfall">Tierunfall</option>
              <option class="item" id="Andere">Andere</option>
            </select>
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
