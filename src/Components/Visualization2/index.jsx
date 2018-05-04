import React from 'react'
import d3 from 'd3'


const Visualization2 = 
<div>
<h2 className="name"> bliblablu</h2>
</div>

const path = "/resources/Strassenverkehrsunfaelle_Maengel_bfs.csv";
let einfluss1, objektart1, strassenart1, unfallschwere1, jahr1;

einfluss1 = "A: Zustand des Lenkers oder Fussg�ngers";
objektart1 = "Personenwagen";
strassenart1 = "Autobahn";
unfallschwere1 = "Unfall mit leicht Verletzten";

const canvHeight = 550, canvWidth = 800;
const margin = {top: 50, right: 20, bottom: 30, left: 60}; 

// create canvas
const svg = d3.select("body").append("svg")
  .attr("width", canvWidth)
  .attr("height", canvHeight)
  .style("border", "1px solid");

const g = svg.append("g")
  .attr("id", "chart-area")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const div = svg.append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

const height = canvHeight - margin.top - margin.bottom;
const width = canvWidth - margin.left - margin.right;


// convert data into an array of objects
d3.csv(path, function(error, data) {
    const einfluss = d3.extent(data, d => d["Mangel oder Einfluss"]);
    const objektart = d3.extent(data, d => d["Objektart"]);
    const strassenart = d3.extent(data, d => d["Strassenart"]);
    const unfallschwere = d3.extent(data, d => d["Unfallschwere"]);

    // create scale for x and y direction
    const xScale = d3.scaleLinear()
    .domain([1992, 2016])
    .rangeRound([0, width]);

    const yScale = d3.scaleLinear()
    .domain([0, 1200])
    .rangeRound([height, 0]);

    // create xAxis and yAxis
    const xAxis = d3.axisBottom(xScale);
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
    .data(data)
    .enter().append("circle")
    .attr("cx", 20)
    .attr("cy", 20)
    .attr("r", 4)
    .style("fill", "#B0CCCC")
});


export default Visualization2
