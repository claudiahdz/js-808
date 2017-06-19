import React from 'react'
import ReactDOM from 'react-dom'
import DrumMachine from './DrumMachine'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DrumMachine />, div)
})
