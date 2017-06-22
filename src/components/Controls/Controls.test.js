import React from 'react'
import { shallow } from 'enzyme'
import Controls from './Controls'

describe('Controls', () => {
  const defaultProps = {
    status: 'stop',
    play: () => {},
    stop: () => {},
    pause: () => {},
    clear: () => {},
    changeBeat: () => {},
    changeTempo: () => {},
    tempo: 60,    
  }

  it('renders the component correctly', () => {
    const controls = shallow(<Controls {...defaultProps} />)
    expect(controls).toMatchSnapshot()
  })

  it('calls play when clicked', () => {
    const props = { 
      ...defaultProps,
      play: jest.fn()
    }
    const controls = shallow(<Controls {...props} />)
    const button = controls.find('.button').first()

    button.simulate('click')
    expect(props.play).toHaveBeenCalled()
  })

  it('calls pause when clicked', () => {
    const props = { 
      ...defaultProps,
      status: 'play',
      pause: jest.fn()
    }
    const controls = shallow(<Controls {...props} />)
    const button = controls.find('.button').first()

    button.simulate('click')
    expect(props.pause).toHaveBeenCalled()
  })

  it('call stop when clicked', () => {
    const props = { 
      ...defaultProps,
      stop: jest.fn()
    }
    const controls = shallow(<Controls {...props} />)
    const button = controls.find('.button').at(1)

    button.simulate('click')
    expect(props.stop).toHaveBeenCalled()
  })

  it('calss changeTempo when clicked', () => {
    const props = { 
      ...defaultProps,
      changeTempo: jest.fn()
    }
    const e = { target: {value: 60} }

    const controls = shallow(<Controls {...props} />)
    const input = controls.find('input')
    input.first().simulate('change', e)

    expect(props.changeTempo).toHaveBeenCalled()
  })

  it('calls changeBeat when clicked', () => {
    const props = { 
      ...defaultProps,
      changeBeat: jest.fn()
    }
    const e = { target: {value: 0} }

    const controls = shallow(<Controls {...props} />)
    const select = controls.find('select')
    select.first().simulate('change', e)

    expect(props.changeBeat).toHaveBeenCalled()
  })

  it('calls clear when clicked', () => {
    const props = { 
      ...defaultProps,
      clear: jest.fn()
    }
    const controls = shallow(<Controls {...props} />)
    const button = controls.find('.button').at(3)

    button.simulate('click')
    expect(props.clear).toHaveBeenCalled()
  })

})
