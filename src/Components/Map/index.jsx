import React, { Component } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import ReactFauxDOM from 'react-faux-dom'
import './style.css'


class Map extends Component {
    static defaultProps = {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        scales: {
            relative: d3.scaleLinear().domain([14, 0]).range([0, 1]),
            absolute: d3.scaleLinear().domain([20, 3583]).range([0, 1]),
            amount: d3.scaleLinear().domain([5394, 731975]).range([0, 1]),
        },
        colors: {
            relative: d3.interpolateRdYlBu,
            absolute: d3.interpolateReds,
            amount: d3.interpolatePurples,
        }
    }

    shouldComponentUpdate() {
        return true
    }

    render() {
        const { id, width, height, selectedDataset } = this.props
        const { country, margin, year, data, cantonMap, scales, colors } = this.props

        const faux = ReactFauxDOM.createElement('g')
        // const faux = this.props.connectFauxDOM('g', 'map')

        const g = d3.select(faux)
        g.attr('transform', `translate(${margin.left},${margin.top})`)

        const projection = d3.geoAlbers()
            .rotate([0, 0])
            .center([8.3, 46.8])
            .scale(2500)
            .translate([width / 2, height / 2])
            .precision(.1)

        const pathGenerator = d3.geoPath().projection(projection)
        const cantons = topojson.feature(country, country.objects.cantons)

        const color = colors[selectedDataset]
        const scale = scales[selectedDataset]

        if (null != data) {
            g.selectAll("path.canton")
                .data(cantons.features)
                .enter()
                .append("path")
                .attr("class", "canton")
                .attr("d", pathGenerator)
                .style('fill', (d, i) => {
                    //debugger
                    const val = data[cantonMap[d.id]][year]
                    return color(scale(val))
                })
                .on('mouseover', (d, i) => {
                    console.info(`${d.properties.name}: ${data[cantonMap[d.id]][year]}`)
                })
                .on('mouseleave', (d, i) => {
                    console.info(`left ${d.properties.name}`)
                })
        }

        // g.append("path.cantonBoundary")
        //     .datum(topojson.mesh(country, country.objects.cantons))
        //     .attr("class", "cantonBoundary")
        //     .attr("d", pathGenerator)

        // g.selectAll("text")
        //     .data(cantons.features)
        //     .enter().append("text")
        //     .attr("transform", d => `translate(${pathGenerator.centroid(d)})`)
        //     .attr("dy", ".35em")
        //     .text(d => d.properties.name)

        return (
            <svg id={id} width={width} height={height} >
                {faux.toReact()}
            </svg>
        )
    }
}

export default Map