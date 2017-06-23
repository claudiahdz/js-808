import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { sequences } from 'config/config'
import DrumMachine from './DrumMachine'

jest.useFakeTimers()

describe('Drum Machine', () => {
  const defaultState = {
    beat: sequences[0].map(r => r.slice()),
    currentStep: 0,
    tempo: 60,
    volumes: [100,100,100,100],
    status: 'stop' 
  }

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DrumMachine />, div)
  })

  it('plays', () => {
    const state = {
      ...defaultState,
      status: 'play',
    }
    const wrapper = shallow(<DrumMachine />)
    wrapper.instance().play()
    expect(wrapper.instance().state).toEqual(state)
  })

  it('plays with the given tempo', () => {
    const tempo = (1000 / (defaultState.tempo * 2) * 60)
    const wrapper = shallow(<DrumMachine />)
    wrapper.instance().play()

    expect(setInterval.mock.calls[0][1]).toBe(tempo)
  })

  it('stops', () => {
    const state = {
      ...defaultState,
      status: 'stop',
      currentStep: 0,
    }
    const wrapper = shallow(<DrumMachine />)
    wrapper.instance().stop()
    expect(wrapper.instance().state).toEqual(state)
  })

  it('pauses', () => {
    const state = {
      ...defaultState,
      status: 'pause',
    }
    const wrapper = shallow(<DrumMachine />)
    wrapper.instance().pause()
    expect(wrapper.instance().state).toEqual(state)
  })

  it('clears', () => {
    const state = {
      ...defaultState,
      beat: Array(4).fill(Array(16).fill(0)),
    }
    const wrapper = shallow(<DrumMachine />)
    wrapper.instance().clear()
    expect(wrapper.instance().state).toEqual(state)
  })

  it('changes beat', () => {
    const state = {
      ...defaultState,
      beat: sequences[1],
    }
    const wrapper = shallow(<DrumMachine />)
    wrapper.instance().changeBeat(sequences[1])
    expect(wrapper.instance().state).toEqual(state)
  })


  it('updates beat', () => {
    let beat = sequences[0].map(r => r.slice())
    beat[0][0] = 0
    const state = {
      ...defaultState,
      beat,
    }
    const wrapper = shallow(<DrumMachine />)
    wrapper.instance().updateBeat(0,0)
    expect(wrapper.instance().state).toEqual(state)
  })


  it('chnages tempo', () => {
    const state = {
      ...defaultState,
      tempo: 180,
    }
    const wrapper = shallow(<DrumMachine />)
    wrapper.instance().changeTempo(180)
    expect(wrapper.instance().state).toEqual(state)
  })

  it('changes volume', () => {
    const state = {
      ...defaultState,
      volumes: [100,80,100,100],
    }
    const wrapper = shallow(<DrumMachine />)
    wrapper.instance().changeVolume(1,80)
    expect(wrapper.instance().state).toEqual(state)
  })

})