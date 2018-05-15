import React, { Component } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import { withFauxDOM } from 'react-faux-dom'
import style from './style.css'


class Map extends Component {
    static defaultProps = {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        map: 'Loading'
    }

    componentDidMount() {
        const { country, width, height, margin, year, data, cantonMap } = this.props

        const faux = this.props.connectFauxDOM('g', 'map')

        const g = d3.select(faux)
        g.attr('transform', `translate(${margin.left},${margin.top})`)

        // color scale
        const color = d3.scaleLinear()
            .domain([0, 3600])
            .range(["white", "rgb(9, 9, 61)"]);

        const projection = d3.geoAlbers()
            .rotate([0, 0])
            .center([8.3, 46.8])
            .scale(2500)
            .translate([width / 2, height / 2])
            .precision(.1)

        const pathGenerator = d3.geoPath().projection(projection)
        const cantons = topojson.feature(country, country.objects.cantons)

        g.selectAll("path.canton")
            .data(cantons.features)
            .enter()
            .append("path")
            .attr("class", "canton")
            .attr("d", pathGenerator)
            .style('fill', (d, i) => {
                debugger
                const val = data[cantonMap[d.id]][year]
                return color(val)
            })

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
    }

    render() {
        const { id, width, height, map } = this.props

        return (
            <svg id={id} width={width} height={height} >
                {map}
            </svg>
        )
    }
}

export default withFauxDOM(Map)