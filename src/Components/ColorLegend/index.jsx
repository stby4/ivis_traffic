import React, { PureComponent } from 'react'

import './style.css'

class ColorLegend extends PureComponent {

    render() {
        const { color, domain, width, height } = this.props

        const cols = Array(width).fill(0).map((x, y) => x + y)
        const colorStep = 1 / width


        const min = domain[0]
        const max = domain[1]

        const invert = domain[0] > domain[1]

        return (
            <div className="mapLegend">
                <span className="mapLegendMin">{Number(invert ? max : min).toLocaleString()}</span>
                <svg width={width} height={height} >
                    {
                        cols.map(col => <path key={`path${col}`} d={`M${col} 0 V ${height}`} stroke={`${color(invert ? 1 - col * colorStep : col * colorStep)}`} strokeWidth="2" />)
                    }
                </svg>
                <span className="mapLegendMax">{Number(invert ? min : max).toLocaleString()}</span>
            </div>
        )
    }
}

export default ColorLegend