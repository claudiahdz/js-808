import React from 'react'
import { shallow } from 'enzyme'
import Key from './Key'

describe('Key', () => {
  const defaultProps = {
    active: 0,
    updateBeat: () => {},
    row: 0,
    column: 0,
  }

  it('renders the component correctly', () => {
    const key = shallow(<Key {...defaultProps} />)
    expect(key).toMatchSnapshot()
  })

  it('calls updateBeat when clicked', () => {
    const props = {
      ...defaultProps,
      updateBeat: jest.fn()
    }
    const key = shallow(<Key {...props} />)
    key.simulate('click')
    
    expect(props.updateBeat).toHaveBeenCalledWith(props.row, props.column)
  })
})

