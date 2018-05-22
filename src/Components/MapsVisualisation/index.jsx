import React, { Component } from 'react'
import * as d3 from 'd3'
import './style.css'

import Map from '../../Components/Map'
import ColorLegend from '../../Components/ColorLegend'

class MapsVisualisation extends Component {
    static defaultProps = {
        paths: {
            topo: `${process.env.PUBLIC_URL}/readme-swiss.json`,
            relative: `${process.env.PUBLIC_URL}/crashes-canton-relative.csv`,
            absolute: `${process.env.PUBLIC_URL}/crashes-canton-absolute.csv`,
            amount: `${process.env.PUBLIC_URL}/amount-canton-absolute.csv`,
        },
        domains: {
            relative: [14, 0],
            absolute: [0, 4000],
            amount: [0, 800000],
        },
        scales: {
            relative: d3.scaleLinear().domain([14, 0]).range([0, 1]),
            absolute: d3.scaleLinear().domain([0, 4000]).range([0, 1]),
            amount: d3.scaleLinear().domain([0, 800000]).range([0, 1]),
        },
        colors: {
            relative: d3.interpolateRdYlBu,
            absolute: d3.interpolateReds,
            amount: d3.interpolatePurples,
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            country: null,
            data: null,
            selectedDataset: 'relative',
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.loadDataset('relative')

        d3.json(this.props.paths.topo)
            .then(country => {
                this.setState({ country: country })
            })
    }

    loadDataset(selectedDataset) {
        this.setState({ data: null })
        d3.csv(this.props.paths[selectedDataset])
            .then(data => {
                this.setState({ selectedDataset: selectedDataset, data: data })
            })
    }

    handleChange(event) {
        this.loadDataset(event.target.value)
    }

    shouldComponentUpdate() {
        return true
    }

    render() {
        const { id, className, scales, colors, domains } = this.props
        const { country, data, selectedDataset } = this.state
        let cantonMap = {}

        if (null != data) {
            for (let i = 0; i < data.length; ++i) {
                cantonMap[data[i].Kanton] = i
            }
        }

        const years = Array(2016 - 1993 + 1).fill(1993).map((x, y) => x + y)

        return (
            <div id={id} className={className}>

                <h2>Entwicklung der Unfallzahlen</h2>

                <form className="selection-area" onChange={this.handleChange}>
                    <div className="selection-group">
                    <h3 className="selection-group-title">Daten auswählen</h3>
                        <select className="selection-items" name="map-selection">
                            <option className="item" value="relative" selected>Unfälle pro 1000 Fahrzeuge</option>
                            <option className="item" value="absolute">Unfälle insgesamt</option>
                            <option className="item" value="amount">Zugelassene Fahrzeuge</option>
                        </select>
                    </div>
                </form>

                <ColorLegend color={colors[selectedDataset]} domain={domains[selectedDataset]} width={200} height={16}/>

                {null != country && <div className="mapsContainer">
                    {years.map(year => <div className="map" key={`map_${year}`}>
                        <div className="mapTitle">{year}</div>
                        <Map
                            id={`map${year}`}
                            country={country}
                            year={year}
                            data={data}
                            cantonMap={cantonMap}
                            color={colors[selectedDataset]}
                            scale={scales[selectedDataset]}
                            width="182"
                            height="121" />
                    </div>)}
                </div>}
            </div>
        )
    }

}

export default MapsVisualisation