import React, { Component } from 'react'
import * as d3 from 'd3'

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

      var colsYears = data.map(function (d) {
        return {
          1992: d['1992'],
          1993: d['1993'],
          1994: d['1994'],
          1995: d['1995']
        }
      });

      const einfluss = d3.extent(data, d => d["Mangel oder Einfluss"])
      const objektart = d3.extent(data, d => d["Objektart"])
      const strassenart = d3.extent(data, d => d["Strassenart"])
      const unfallschwere = d3.extent(data, d => d["Unfallschwere"])
      const jahr1992 = d3.extent(data, d => d["1992"])

      // create scale for x and y direction
      const xScale = d3.scaleTime()
        .domain([new Date("1991"), new Date("2016")])
        .rangeRound([0, width])

      const yScale = d3.scaleLinear()
        .domain([0, 800])
        .rangeRound([height, 0])

      const g = d3.select("#chart-area")

      // create xAxis and yAxis
      const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"))
      g.select("#axisX").call(xAxis)


      const yAxis = d3.axisLeft(yScale)
      g.select("#axisY").call(yAxis) // evtl. umschreiben, so dass select nicht mehr verwendet wird

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (height / 2))
        .attr("y", 0 - margin.left)
        .attr("class", "label")
        .attr("dy", "1em")
        .attr("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .text("Anzahl Unfälle ");

      g.append("text")
        .attr("x", width / 2)
        .attr("y", height + 25)
        .attr("class", "label")
        .attr("dy", "1em")
        .attr("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .text("Jahre");

      console.log("wert?: " + colsYears[1][1992]);

      g.selectAll("circle") // evtl. umschreiben, so das selectAll nicht mehr verwendet wird
        .data(filteredData)
        .enter().append("circle")
        // Für jedes Datum auf der x-Achse soll ein circle gezeichnet werden.
        .attr("cx", function (d) { return xScale(d.date); })
        .attr("cx", 60)
        .attr("cy", d => yScale(d['1996']))
        .attr("r", 4)
        .style("fill", "#b0cccc")
    }


    return (
      <div>
        <div id="selection-area">
          <div>
            <select>
              <option value="bla1">bla1</option>
              <option value="bla2">bla2</option>
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
