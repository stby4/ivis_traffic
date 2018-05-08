import React, { Component } from 'react'
import * as d3 from 'd3'
import ReactDOM from 'react-dom'

class Visualization2 extends Component {
  static defaultProps = {
    svgId: 'canvas',
    path: '/resources/Strassenverkehrsunfaelle_Maengel_bfs.csv',
    canvHeight: 550,
    canvWidth: 800,
    margin: { top: 50, right: 20, bottom: 30, left: 60 },
    height: 550-50-30,
    width: 800-60-20,
  }

  static state = {
    einfluss1: "A: Zustand des Lenkers oder Fussgängers",
    objektart1: "Personenwagen",
    strassenart1: "Autobahn",
    unfallschwere1: "Unfall mit leicht Verletzten",
    jahr1: 2018
  }

  componentDidMount() {
    const { path, svgId, canvHeight, canvWidth, margin, height, width } = this.props

    const zScale = d3.scaleLinear()
      .domain([0, 1200])
      .rangeRound([900, 0])
    const zAxis = d3.axisLeft(zScale)

    // convert data into an array of objects
    d3.csv(path, function (error, data) {
      const einfluss = d3.extent(data, d => d["Mangel oder Einfluss"])
      const objektart = d3.extent(data, d => d["Objektart"])
      const strassenart = d3.extent(data, d => d["Strassenart"])
      const unfallschwere = d3.extent(data, d => d["Unfallschwere"])
      const jahr1992 = d3.extent(data, d => d["1992"])

      // create scale for x and y direction
      const xScale = d3.scaleTime()
        .domain([new Date("1992"), new Date("2016")])
        .rangeRound([0, width])

      const yScale = d3.scaleLinear()
        .domain([0, 1200])
        .rangeRound([height, 0])

      const g = d3.select("#chart-area")

      // create xAxis and yAxis
      const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"))
      g.select("#axisX").call(xAxis)

      const yAxis = d3.axisLeft(yScale)
      g.select("#axisY").call(yAxis)

      g.selectAll("circle")
        .data(jahr1992)
        .enter().append("circle")
        .attr("cx", 200)
        .attr("cy", 200)
        .attr("r", 4)
        .style("fill", "#b0cccc")
    })
  }

  render() {
    const { svgId, canvHeight, canvWidth, margin, height } = this.props

    return (
      <div>
        <div className="vis2">
          <svg id={svgId} width={canvWidth} height={canvHeight} style={{ align: 'center' }}>
            <g id="chart-area" transform={`translate(${margin.left},${margin.top})`}>
              <g id="axisX" className="axis" transform={`translate(0,${height})`} />
              <g id="axisY" className="axis" />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

export default Visualization2
