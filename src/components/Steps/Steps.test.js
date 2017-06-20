import React from 'react'
import { shallow } from 'enzyme'
import Steps from './Steps'

describe('Steps', () => {
  const defaultProps = {
    status: 'stop',
    currentStep: 0
  }

  it('renders the component correctly', () => {
    const steps = shallow(<Steps {...defaultProps} />)
    expect(steps).toMatchSnapshot()
  })
})

