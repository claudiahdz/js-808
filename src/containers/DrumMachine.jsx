import React, { Component } from 'react'
import { sounds, sequences } from 'config/config'

import Controls from 'components/Controls/Controls'
import Keys from 'components/Keys/Keys'

import './DrumMachine.css'

class DrumMachine extends Component {

  state = {
    beat: sequences[0],
    currentStep: 0,
    tempo: 60,
    interval: null,
    status: 'stop' 
  }

  play = () => {
    const { tempo } = this.state
    let currentStep = this.state.currentStep

    const setTempo = (1000 / (tempo * 2) * 60)

    this.setState({ status: 'play' })

    let playId = setInterval(() => {
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

    this.setState({ interval: playId })
  }

  stop = () => {
    const { interval } = this.state
    this.setState({ status: 'stop' })
    this.setState({ currentStep: 0 })
    clearInterval(interval)
  }

  pause = () => {
    const { interval } = this.state
    this.setState({ status: 'pause' })
    clearInterval(interval)
  }

  clear = () => {
    this.stop()
    this.changeBeat(Array(4).fill(Array(16).fill(0)))
  }

  changeBeat = (beat) => {
    this.setState({ beat })
  }

  updateBeat = (row, column) => {
    let beat = this.state.beat
    beat[row][column] = !this.state.beat[row][column]
    this.setState({ beat })
  }

  changeTempo = (e) => {
    const { status } = this.state
    this.pause()
    this.setState({ tempo: e.target.value })
    if (status === 'play') {
      this.play()
    }
  }

  changeVolume = () => {
    // sound.volume(value);
  }

  render() {
    const { beat, currentStep, status } = this.state
    let active

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
          <div className="header">
            { Array.from(Array(16)).map((elem, i) => {
                active = (currentStep === i) && (status === 'play')
                return <span key={i} className={`${active && 'active'}`}>{i+1}</span>
              })
            }
          </div>
          <div className="types">
            <div className="type">Kick</div>
            <div className="type">Snare</div>
            <div className="type">Open Hat</div>
            <div className="type">Closed Hat</div>
          </div>
          <Keys 
            beat={beat} 
            currentStep={currentStep}
            status={status} 
            updateBeat={this.updateBeat}
          />
        </div>
      </div>
    )
  }
}

export default DrumMachine
