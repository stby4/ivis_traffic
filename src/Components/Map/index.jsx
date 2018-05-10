import React, { Component } from 'react'
import * as d3 from 'd3'

class Map extends Component {
    static defaultProps = {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        path: `${process.env.PUBLIC_URL}/readme-swiss.json`,
    }

    constructor(props) {
        super(props)
        this.state = {
            country = null,
        }
    }

    componentDidMount() {
        d3.json(this.props.path).then(country => {
            this.setState({ country: country })
        })
    }

    render() {
        const { country, id, width, height } = this.props


        if (null !== country) {
            const cantons = topojson.feature(swiss, swiss.objects.cantons)

            const svg = d3.select(`#${id}`)

            const projection = d3.geoAlbers()
                .rotate([0, 0])
                .center([8.3, 46.8])
                .scale(16000)
                .translate([canvWidth / 2, canvHeight / 2])
                .precision(.1)

            const pathGenerator = d3.geoPath().projection(projection)

            svg.selectAll("path.canton")
                .data(cantons.features)
                .enter()
                .append("path")
                .attr("class", "canton")
                .attr("d", pathGenerator)

            svg.append("path.canton-boundary")
                .datum(topojson.mesh(swiss, swiss.objects.cantons))
                .attr("class", "canton-boundary")
                .attr("d", pathGenerator)

            svg.selectAll("text")
                .data(cantons.features)
                .enter().append("text")
                .attr("transform", d => `translate(${pathGenerator.centroid(d)})`)
                .attr("dy", ".35em")
                .text(d => d.properties.name)
        }

        return (
            <svg id={id} width={width} height={height}>
                <g id={`${id}-group`} transform={`translate(${margin.left},${margin.top})`} />
            </svg>
        )
    }
}