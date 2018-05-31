import React from 'react'
import renderer from 'react-test-renderer'
import MapsDescription from '../'

test('Snapshot ColorLegend', () => {
    const tree = renderer
        .create(
            <MapsDescription />
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
})