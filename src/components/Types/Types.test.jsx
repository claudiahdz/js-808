import React from 'react'
import { shallow } from 'enzyme'
import Types from './Types'

describe('Types', () => {
  const defaultProps = {
    volumes: [100,100,100,100],
    changeVolume: () => {}
  }

  it('renders the component correctly', () => {
    const types = shallow(<Types {...defaultProps} />)
    expect(types).toMatchSnapshot()
  })

  it('changes volume', () => {
    const props = {
      ...defaultProps,
      changeVolume: jest.fn()
    }
    const e = { target: {value: 60} }
    const types = shallow(<Types {...props} />)
  
    const input = types.find('input')
    input.first().simulate('change', e)

    expect(props.changeVolume).toHaveBeenCalledWith(0, e.target.value)
  })
})

