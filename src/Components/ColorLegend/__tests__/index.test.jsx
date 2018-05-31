import React from 'react'
import renderer from 'react-test-renderer'
import ColorLegend from '../'

const color = jest.fn()
const domain = [0, 2000]

test('Snapshot ColorLegend', () => {
    const tree = renderer
        .create(
            <ColorLegend color={color} domain={domain} width="500" height="100" />
        )
        .toJSON()
    expect(tree).toMatchSnapshot()
    expect(color.mock.calls.length).toBe(1)
})