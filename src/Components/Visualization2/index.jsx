import React, { Component } from 'react'
import * as d3 from 'd3'
import './style.css'

class Visualization2 extends Component {
  static defaultProps = {
    svgId: 'canvas',
    path: `${process.env.PUBLIC_URL}/data_unfaelle_bereinigt.csv`,
    canvHeight: 710,
    canvWidth: 1110,
    margin: { top: 70, right: 15, bottom: 0, left: 60 },
    height: 650 - 70 - 0,
    width: 1100 - 50 - 15,
  }

  constructor(props) {
    super(props)
    this.state = {
      objektart: "Personenwagen",
      unfallschwere: "Unfall mit leicht Verletzten",
      strassenart: "Hauptstrasse",
      unfalltyp: "Fussgängerunfall",
      data: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.objektart + "   " + this.state.unfallschwere);
    event.preventDefault();
  }

  componentDidMount() {
    d3.csv(this.props.path)
      .then(data => {
        this.setState({ data: data }) // now this.state.data can be used in the render() function;
      })
  }

  render() {
    const { svgId, canvHeight, canvWidth, margin, width, height } = this.props
    const { data } = this.state

    if (null !== data) {

      // TRY OUT HERE
      // let filteredData = data.filter(row => row['Objektart'] === objektart1)
      // let filteredData_3 = filteredData.filter(row => row['Strassenart'] === strassenart1)
      // let filteredData_4 = filteredData_3.filter(row => row['Unfallschwere'] === unfallschwere1)
      // let filteredData_5 = filteredData_4.filter(row => row['Unfalltyp'] === 'Schleuder-, Selbstunfall')

      // select chart-area
      const g = d3.select("#chart-area")

      // define the line
      var valueline = d3.line()
        .x((d, i) => { return xScale(new Date('' + (1992 + i))) })
        .y((d, i) => { return yScale(d) })
        .curve(d3.curveCatmullRom)

      // create scale for x direction
      const xScale = d3.scaleTime()
        .domain([new Date("1992"), new Date("2016")])
        .rangeRound([2, width])

      // create scale for y direction
      let yScale
      if (this.state.objektart === 'Personenwagen') {
        yScale = d3.scaleLinear()
          .domain([0, 3000])
          .rangeRound([height - 2, 0])
      } else if (this.state.objektart === 'Fahrrad' || this.state.objektart === 'FussgängerIn') {
        yScale = d3.scaleLinear()
          .domain([0, 700])
          .rangeRound([height - 2, 0])
      } else if (this.state.objektart === 'Sachentransportfahrzeuge' || this.state.objektart === 'Motorrad über 125 ccm' || this.state.objektart === 'Motorrad bis 125 ccm' || this.state.objektart === 'Motorfahrrad') {
        yScale = d3.scaleLinear()
          .domain([0, 400])
          .rangeRound([height - 2, 0])
      } else {
        yScale = d3.scaleLinear()
          .domain([0, 150])
          .rangeRound([height - 2, 0])
      }

      // create xAxis
      const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"))
      g.select("#axisX").call(xAxis)

      // create yAxis
      const yAxis = d3.axisLeft(yScale)
      g.select("#axisY").call(yAxis)

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

      // Define container for tooltip
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip invisible")
      //.text(this.state.objektart+", "+this.state.unfallschwere+", "+this.state.strassenart+", "+this.state.unfalltyp);

      // Change used data depending on selected Objektart
      d3.selectAll("path.lines").remove();
      let selectedObjektart = data.filter(row => row['Objektart'] === this.state.objektart)
      for (let i in selectedObjektart) {
        let theData = Object.values(selectedObjektart[i]).slice(0, 2016 - 1992 + 1)

        // Add the circles
        /*         g.selectAll("circle")
                  .data(theData)
                  .enter()
                  .append("circle")
                  .attr("r", 4)
                  .attr("cx", (d, i) => { return xScale(new Date('' + (1992 + i))) })
                  .attr("cy", (d, i) => { return yScale(d) })
                  .style("fill", "#F0F0F0") */

        // Add valueline paths.
        g.append("path")
          .data([theData])
          .attr("class", "lines")
          .attr("stroke", "#E1E1E1")
          .attr("stroke-width", "1.0px")
          .attr("fill", "none")
          .attr("d", valueline)
          .on("mouseover", function (d) {
            tooltip.html(selectedObjektart[i]['Objektart'] + ", " + selectedObjektart[i]['Unfallschwere'] + ", <br/>" + selectedObjektart[i]['Strassenart'] + ", " + selectedObjektart[i]['Unfalltyp'])
              .style("left", (d3.event.pageX - 2) + "px")
              .style("top", (d3.event.pageY - 50) + "px")
            return tooltip.attr("class", "tooltip");
          })
          .on("mouseout", function (d) {
            return tooltip.attr("class", "tooltip invisible");
          });
      };

      // Add the path for the selected data.
      d3.select("#selected").remove();
      let selectedData = data.filter(row => row['Objektart'] === this.state.objektart && row['Unfallschwere'] === this.state.unfallschwere && row['Strassenart'] === this.state.strassenart && row['Unfalltyp'] === this.state.unfalltyp)
      let theData2 = Object.values(selectedData[0]).slice(0, 2016 - 1992 + 1)

      g.append("path")
        .data([theData2])
        .attr("class", "lines")
        .attr("id", "selected")
        .attr("stroke", "#4889BF")
        .attr("stroke-width", "2.0px")
        .attr("fill", "none")
        .attr("d", valueline)
    }



    return (
      <div className="container" id="visualization2">

        <h2>Art der Unfälle</h2>

        <div className="selection-area">
          <form onSubmit={this.handleSubmit}>
            <div className="selection-group">
              <h3 className="selection-group-title">Objektart</h3>
              <select size="3" className="selection-items" id="Objektart" name="objektart" value={this.state.objektart} onChange={this.handleChange} >
                <option className="item" id="Personenwagen">Personenwagen</option>
                <option className="item" id="Personentransportfahrzeuge">Personentransportfahrzeuge</option>
                <option className="item" id="Sachentransportfahrzeuge">Sachentransportfahrzeuge</option>
                <option className="item" id="Kleinmotorrad">Kleinmotorrad</option>
                <option className="item" id="Motorrad bis 125 ccm">Motorrad bis 125 ccm</option>
                <option className="item" id="Motorrad über 125 ccm">Motorrad über 125 ccm</option>
                <option className="item" id="Fahrrad">Fahrrad</option>
                <option className="item" id="Motorfahrrad">Motorfahrrad</option>
                <option className="item" id="FussgängerIn">FussgängerIn</option>
              </select>
            </div>
            <div className="selection-group">
              <h3 className="selection-group-title">Unfallschwere</h3>
              <select size="3" className="selection-items" id="Unfallschwere" name="unfallschwere" value={this.state.unfallschwere} onChange={this.handleChange} >
                <option className="item" id="Unfall mit leicht Verletzten">Unfall mit leicht Verletzten</option>
                <option className="item" id="Unfall mit schwer Verletzten">Unfall mit schwer Verletzten</option>
                <option className="item" id="Unfall mit Getöteten">Unfall mit Getöteten</option>
              </select>
            </div>
            <div className="selection-group">
              <h3 className="selection-group-title">Strassenart</h3>
              <select size="3" className="selection-items" id="Strassenart" name="strassenart" value={this.state.strassenart} onChange={this.handleChange} >
                <option className="item" id="Autobahn">Autobahn</option>
                <option className="item" id="Autostrasse">Autostrasse</option>
                <option className="item" id="Hauptstrasse">Hauptstrasse</option>
                <option className="item" id="Nebenstrasse">Nebenstrasse</option>
              </select>
            </div>
            <div className="selection-group">
              <h3 className="selection-group-title">Unfalltyp</h3>
              <select size="3" className="selection-items" id="Unfalltyp" name="unfalltyp" value={this.state.unfalltyp} onChange={this.handleChange} >
                <option className="item" id="Fussgängerunfall">Fussgängerunfall</option>
                <option className="item" id="Schleuder-, Selbstunfall">Schleuder-, Selbstunfall</option>
                <option className="item" id="Beim Kreuzen (in Längsrichtung)">Beim Kreuzen (in Längsrichtung)</option>
                <option className="item" id="Ueberholunfall">Ueberholunfall</option>
                <option className="item" id="Auffahrunfall">Auffahrunfall</option>
                <option className="item" id="Beim Vorbeifahren, Fahrstreifenwechsel">Beim Vorbeifahren, Fahrstreifenwechsel</option>
                <option className="item" id="Beim Richtungswechsel (mit Abbiegen)">Beim Richtungswechsel (mit Abbiegen)</option>
                <option className="item" id="Beim Queren (ohne Abbiegen)">Beim Queren (ohne Abbiegen)</option>
                <option className="item" id="Tierunfall">Tierunfall</option>
              </select>
            </div>
            {/* <input id="submit-btn" type="submit" value="Filtern" /> */}
          </form>
        </div>
        <svg id={svgId} width={canvWidth} height={canvHeight} style={{ align: 'center' }}>
          <g id="chart-area" transform={`translate(${margin.left},${margin.top})`}>
            <g id="axisX" className="axis" transform={`translate(0,${height})`} />
            <g id="axisY" className="axis" />
          </g>
        </svg>
        <div className="description">
          <p>
            Hier können die Unfälle nach Unfallverursacher, Unfallschwere, Strassenart und Unfalltyp gefiltert werden.
            Je nach ausgewähltem Unfallverursacher passt sich die Skala an, da sich die Anzahl Unfälle für die verschiedenen Unfallverursacher stark unterscheiden.
            Die ausgegrauten Linien repräsentieren alle Kombiniationsmöglichkeiten pro Unfallverursacher.
            Die blaue Linie repräsentiert die Auswahl, welcher der Benutzer mittels der Filter getroffen hat.
            Beim hovern über die Linien erscheint ein Tooltip mit den Daten zur jeweiligen Linie.
          </p>
          <h4>Quelle</h4>
          <ul className="sources">
            <li><a href="https://www.bfs.admin.ch/bfs/de/home/statistiken/kataloge-datenbanken/daten.assetdetail.5267255.html" target="_blank" rel="noopener noreferrer">Strassenverkehrsunfälle: Mutmassliche Mängel und Einflüsse nach Mangel oder Einfluss, Unfallschwere, Unfalltyp, Strassenart und Objektart</a>, Bundesamt für Statistik, abgerufen am 22. Mai 2018</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Visualization2
