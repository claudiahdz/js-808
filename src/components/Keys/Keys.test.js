import React from 'react'
import { shallow, render, mount } from 'enzyme'
import Keys from './Keys'
import Key from 'components/Keys/Keys'

describe('Keys', () => {
  const defaultProps = {
    beat: Array(4).fill(Array(16).fill(0)),
    updateBeat: () => {},
    status: 'stop',
    currentStep: 0,
  }

  it('renders the component correctly', () => {
    const props = { ...defaultProps }
    const keys = shallow(<Keys {...props} />)
    expect(keys).toMatchSnapshot()
  })
})
