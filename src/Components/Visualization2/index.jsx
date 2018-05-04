import React from 'react'
import * as d3 from 'd3'


const Visualization2 = ({name}) =>
<div id="canvas">
  <h2 className="name">ja das geht schon mal :)</h2>
</div>

const path = "/resources/Strassenverkehrsunfaelle_Maengel_bfs.csv";
let einfluss1, objektart1, strassenart1, unfallschwere1, jahr1;

einfluss1 = "A: Zustand des Lenkers oder Fussg�ngers";
objektart1 = "Personenwagen";
strassenart1 = "Autobahn";
unfallschwere1 = "Unfall mit leicht Verletzten";

const canvHeight = 550, canvWidth = 1000;
const margin = {top: 80, right: 40, bottom: 40, left: 50}; 

// create canvas
const svg = d3.select("body").append("svg")
  .attr("width", canvWidth)
  .attr("height", canvHeight)
  .attr("align", "center")
  .style("border", "1px solid")
  .style("margin", "0 10%");

const g = svg.append("g")
  .attr("id", "chart-area")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const height = canvHeight - margin.top - margin.bottom;
const width = canvWidth - margin.left - margin.right;


// convert data into an array of objects
d3.csv(path, function(error, data) {
    const einfluss = d3.extent(data, d => d["Mangel oder Einfluss"]);
    const objektart = d3.extent(data, d => d["Objektart"]);
    const strassenart = d3.extent(data, d => d["Strassenart"]);
    const unfallschwere = d3.extent(data, d => d["Unfallschwere"]);
    const jahr1992 = d3.extent(data, d => d["1992"]);

    // create scale for x and y direction
    const xScale = d3.scaleTime()
    .domain([new Date("1992"), new Date("2016")])
    .rangeRound([0, width]);

    const yScale = d3.scaleLinear()
    .domain([0, 1200])
    .rangeRound([height, 0]);

    // create xAxis and yAxis
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
    g.append("g")
    .call(xAxis)
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")");

    const yAxis = d3.axisLeft(yScale);
    g.append("g")
    .attr("class", "axis")
    .call(yAxis);


    // circles
    g.selectAll("circle")
    .data(jahr1992)
    .enter().append("circle")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("r", 4)
    .style("fill", "#B0CCCC")
});


export default Visualization2
