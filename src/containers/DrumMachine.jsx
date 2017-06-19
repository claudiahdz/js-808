import React, { Component } from 'react'
import { sounds, sequences } from 'config/config'

import Controls from 'components/Controls/Controls'
import Steps from 'components/Steps/Steps'
import Types from 'components/Types/Types'
import Keys from 'components/Keys/Keys'

import './DrumMachine.css'

class DrumMachine extends Component {

  constructor(props) {
    super(props)
    this.interval = null
    this.state = {
      beat: sequences[0],
      currentStep: 0,
      tempo: 60,
      status: 'stop' 
    }
  }

  play = () => {
    const { tempo } = this.state
    const setTempo = (1000 / (tempo * 2) * 60)
    let currentStep = this.state.currentStep

    const playId = setInterval(() => {
      const { beat } = this.state

      for(let j = 0; j < 4; j++) { 
        if (beat[j][currentStep]) {
          sounds[j].play()
        }
      }
      if(currentStep < 15) {
        currentStep++
      } else if(currentStep >= 15) {
        currentStep = 0
      }
      this.setState({ currentStep })
    }, setTempo)

    this.setState({ status: 'play' })
    this.interval = playId
  }

  stop = () => {
    clearInterval(this.interval)
    this.interval = null
    this.setState({ 
      status: 'stop',
      currentStep: 0,
     })
  }

  pause = () => {
    clearInterval(this.interval)
    this.interval = null
    this.setState({ status: 'pause' })
  }

  clear = () => {
    this.stop()
    this.changeBeat(Array(4).fill(Array(16).fill(0)).map(r => r.slice()))
  }

  changeBeat = (beat) => {
    this.setState({ beat })
  }

  updateBeat = (row, column) => {
    let beat = this.state.beat
    beat[row][column] = +!this.state.beat[row][column]
    this.setState({ beat })
  }

  changeTempo = (e) => {
    console.log(this.state.currentStep)
    clearInterval(this.interval)
    this.interval = null
    this.setState({ tempo: e.target.value }, () => {
      if (this.state.status === 'play') {
        this.play()
      }
    })   
  }

  changeVolume = (sound, volume) => {
    console.log(sound, volume)
    // sound.volume(value);
  }

    //   var calculateBPM = function() {

    //   _stepDelay = Math.round(((_sampleRate * _minuteInSeconds) / (_beatsPerMinute * _totalSteps)) / _totalSteps);

    //   return _stepDelay;

    // };

     // 1 / (4 * BPM / (60 * 1000))

  render() {
    const { beat, currentStep, status } = this.state

    return (
      <div className="container">
        <h1>JS-808 Sequencer</h1>
        <Controls 
          status={status}
          play={this.play}
          stop={this.stop}
          pause={this.pause}
          clear={this.clear}
          changeBeat={this.changeBeat}
          changeTempo={this.changeTempo}
        />
        <div className="drum-wrapper">
          <Steps status={status} currentStep={currentStep} />
          <Types changeVolume={this.changeVolume} />
          <Keys 
            beat={beat} 
            status={status} 
            currentStep={currentStep}
            updateBeat={this.updateBeat}
          />
        </div>
      </div>
    )
  }
}

export default DrumMachine
