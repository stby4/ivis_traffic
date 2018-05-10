import React, { Component } from 'react'
import * as d3 from 'd3'

class Visualization2 extends Component {
  static defaultProps = {
    svgId: 'canvas',
    path: `${process.env.PUBLIC_URL}/StrassenverkehrsunfaelleMaengel.csv`,
    canvHeight: 550,
    canvWidth: 800,
    margin: { top: 50, right: 20, bottom: 30, left: 60 },
    height: 550 - 50 - 30,
    width: 800 - 60 - 20,
  }

  constructor(props) {
    super(props)
    this.state = {
      einfluss1: "A: Zustand des Lenkers oder Fussgängers",
      objektart1: "Personenwagen",
      strassenart1: "Autobahn",
      unfallschwere1: "Unfall mit leicht Verletzten",
      jahr1: 2018,
      data: null,
    }
  }

  componentDidMount() {

    // TRYING OUT STUFF
    // fetch(this.props.path)
    //   .then(response => response.text())
    //   .then(data => {
    //     this.setState({ data: d3.csvParse(data) }) // now this.state.data can be used in the render() function
    //   })

    d3.csv(this.props.path)
      .then(data => {
        this.setState({ data: data }) // now this.state.data can be used in the render() function
      })

    let filteredData
    const d = d3.csv(`${process.env.PUBLIC_URL}/StrassenverkehrsunfaelleMaengel.csv`, data => {
      // console.log("1.Zeile: " + data[0])      // Warum ist das undefined?? - data ist ein Object, kein array.
      // const unfaltyp = data[4].Unfalltyp - so nicht, sondern:
      const unfalltyp = data['Unfalltyp']
      //console.log(unfalltyp)
    })
   
    d.then(data => {
      filteredData = data.filter(row => row['Mangel oder Einfluss'] == this.state.einfluss1)
      console.log("Show me some data: "+filteredData)
      filteredData = filteredData.filter(row => row['Objektart'] == this.state.objektart1)
      filteredData = filteredData.filter(row => row['Strassenart'] == this.state.strassenart1)
      filteredData = filteredData.filter(row => row['Unfallschwere'] == this.state.unfallschwere1)
      console.log("Show me some data: "+filteredData)
    })
    // END OF TRYING OUT

    const { path, svgId, canvHeight, canvWidth, margin, height, width } = this.props

    const zScale = d3.scaleLinear()
      .domain([0, 1200])
      .rangeRound([900, 0])
    const zAxis = d3.axisLeft(zScale)

    
  }

  render() {
    var exampleData = [
      {"count" : 200},
      {"count" : 300},
      {"count" : 400},
      {"count" : 500}
    ];

    const { svgId, canvHeight, canvWidth, margin, width, height } = this.props
    const { data } = this.state

    if (null !== data) {
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
      g.select("#axisY").call(yAxis) // evtl. umschreiben, so dass select nicht mehr verwendet wird

      g.selectAll("circle") // evtl. umschreiben, so das selectAll nicht mehr verwendet wird
        .data(exampleData)
        .enter().append("circle")
        .attr("cx", d => d.count)
        .attr("cy", 200)
        .attr("r", 4)
        .style("fill", "#b0cccc")
    }

    return (
      <svg id={svgId} width={canvWidth} height={canvHeight} style={{ align: 'center' }}>
        <g id="chart-area" transform={`translate(${margin.left},${margin.top})`}>
          <g id="axisX" className="axis" transform={`translate(0,${height})`} />
          <g id="axisY" className="axis" />
        </g>
      </svg >
    )
  }
}

export default Visualization2
