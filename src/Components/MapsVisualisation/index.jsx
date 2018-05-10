import React, { Component } from 'react'
import * as d3 from 'd3'
import style from './style.css'
import Map from '../../Components/Map'

class MapsVisualisation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: null,
        }
    }

    componentDidMount() {
        d3.json(`${process.env.PUBLIC_URL}/readme-swiss.json`).then(country => {
            this.setState({ country: country })
        })
    }

    render() {
        const { id, className } = this.props
        const { country } = this.state

        const years = Array(10).fill(1992).map((x, y) => x + y) // @todo real data

        return (
            <div id={id} className={className}>

                <h2>Grafik 1</h2>

                {null != country && <div className="mapsContainer">
                    {years.map(year => <div className="map"><Map key={`map${year}`} id={`map${year}`} country={country} width="182" height="121"/></div>)}
                </div>}
            </div>
        )
    }

}

export default MapsVisualisation