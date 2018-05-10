import React, { Component } from 'react'
import * as d3 from 'd3'
import style from './style.css'

class MapsVisualisation extends Component {

    render() {
        const { id, className } = this.props

        return (
            <div id={id} className={className}>

                <h2>Grafik 1</h2>

                <div className="mapsContainer">
                Hurra    
                </div>
            </div>
        )
    }

}

export default MapsVisualisation