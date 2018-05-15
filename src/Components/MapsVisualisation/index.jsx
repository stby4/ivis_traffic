import React, { Component } from 'react'
import * as d3 from 'd3'
import style from './style.css'
import Map from '../../Components/Map'

class MapsVisualisation extends Component {
    static defaultProps = {
        paths: {
            topo: `${process.env.PUBLIC_URL}/readme-swiss.json`,
            crashes: `${process.env.PUBLIC_URL}/crashes-canton.csv`,
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            country: null,
            data: null,
            selectedDataset: 'crashes'
        }
    }

    componentDidMount() {
        d3.json(this.props.paths.topo)
            .then(country => {
                this.setState({ country: country })
            })

        d3.csv(this.props.paths[this.state.selectedDataset])
            .then(data => {
                this.setState({ data: data })
            })
    }

    render() {
        const { id, className } = this.props
        const { country, data } = this.state
        let cantonMap = {}

        if (null != data) {
            for (let i = 0; i < data.length; ++i) {
                cantonMap[data[i].Kanton] = i
            }
        }

        const years = Array(2016 - 1992).fill(1992).map((x, y) => x + y)

        return (
            <div id={id} className={className}>

                <h2>Unfälle pro 1000 registrierten Fahrzeugen</h2>

                {null != country && null != data && <div className="mapsContainer">
                    {years.map(year => <div className="map">
                        <div className="mapTitle">{year}</div>
                        <Map
                            key={`map${year}`}
                            id={`map${year}`}
                            country={country}
                            year={year}
                            data={data}
                            cantonMap={cantonMap}
                            width="182"
                            height="121" />
                    </div>)}
                </div>}
            </div>
        )
    }

}

export default MapsVisualisation