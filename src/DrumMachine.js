import React, { Component } from 'react'
import { sequences } from 'config'

import Controls from 'components/Controls/Controls'
import Keys from 'components/Keys/Keys'

import 'DrumMachine.css'

class DrumMachine extends Component {

  constructor(props) {
    super(props)
    this.columns = []
    this.steps = []
    this.state = {
      beat: sequences[0],
    }
  }

  updateBeat = (beat) => {
    this.setState({ beat })
  }

  render() {
    return (
      <div className="container">
        <h1>JS-808 Sequencer</h1>
        <Controls 
          columns={this.columns} 
          steps={this.steps}
          updateBeat={this.updateBeat}
        />
        <div className="drum-wrapper">
          <div className="header">
            { Array.from(Array(16)).map((elem, i) => <span key={i} ref={(elem) => { this.steps[i] = elem} }>{i+1}</span>) }
          </div>
          <div className="types">
            <div className="type">Kick</div>
            <div className="type">Snare</div>
            <div className="type">Open Hat</div>
            <div className="type">Closed Hat</div>
          </div>
          <Keys beat={this.state.beat} columns={this.columns}/>
        </div>
      </div>
    )
  }
}

export default DrumMachine
