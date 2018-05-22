import React, { Component } from 'react'
import * as d3 from 'd3'
import './style.css'

import Map from '../../Components/Map'

class MapsVisualisation extends Component {
    static defaultProps = {
        paths: {
            topo: `${process.env.PUBLIC_URL}/readme-swiss.json`,
            relative: `${process.env.PUBLIC_URL}/crashes-canton-relative.csv`,
            absolute: `${process.env.PUBLIC_URL}/crashes-canton-absolute.csv`,
            amount: `${process.env.PUBLIC_URL}/amount-canton-absolute.csv`,
        },
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
        const { id, className } = this.props
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

                <h2>Unfälle pro 1000 registrierten Fahrzeugen</h2>

                <form className="selection-area" onChange={this.handleChange}>
                    <div className="selection-group">
                        <select size="2" class="selection-items" name="map-selection">
                            <option value="relative" selected>Unfälle pro 1000 Fahrzeuge</option>
                            <option value="absolute">Unfälle insgesamt</option>
                            <option value="amount">Zugelassene Fahrzeuge</option>
                        </select>
                    </div>
                </form>

                {null != country && <div className="mapsContainer">
                    {years.map(year => <div className="map" key={`map_${year}`}>
                        <div className="mapTitle">{year}</div>
                        <Map
                            id={`map${year}`}
                            country={country}
                            year={year}
                            data={data}
                            cantonMap={cantonMap}
                            selectedDataset={selectedDataset}
                            width="182"
                            height="121" />
                    </div>)}
                </div>}
            </div>
        )
    }

}

export default MapsVisualisation