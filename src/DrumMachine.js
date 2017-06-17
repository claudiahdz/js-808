import React, { Component } from 'react'

import { sounds, sequences } from './config.js'

import Controls from './components/Controls'
import Key from './components/Key'

import './DrumMachine.css'

class DrumMachine extends Component {

  constructor(props) {
    super(props)
    this.columns = []
    this.steps = []
    this.interval = null
    this.currentStep = 0
    this.tempo = 60
    this.state = {
      beat: sequences[0],
    }
  }

  renderKeys = () => {
    const { beat } = this.state
    let column = []
    let columns = []

    for(let i = 0; i < 16; i++) {
      for(let j = 0; j < 4; j++) { 
        column.push(<Key key={`row${i}-column${j}`} active={beat[j][i]} />)
      }
      columns.push(
        <div className="column" key={`column${i}`} ref={(elem) => { this.columns[i] = elem} }>
          {column}
        </div>
      )
      column = []
    }
    return columns
  }

  setTempo = () => {
    return (1000 / (this.tempo * 2) * 60)
  }

  play = () => {
    let currentStep = 0
    let oldStep = 15

    let playId = setInterval(() => {  
      this.columns[oldStep].className = 'column'
      this.columns[currentStep].className = 'column active'

      this.steps[oldStep].className = ''
      this.steps[currentStep].className = 'active'

      Array.from(this.columns[currentStep].children).forEach((elem, i) => {
        if (/active/.test(elem.className)) {
          sounds[i].play()
        }
      })

      if(currentStep < 15) {
        currentStep++
        oldStep = currentStep - 1
      } else if(currentStep >= 15) {
        currentStep = 0
        oldStep = 15
      }
    
      this.currentStep = oldStep

    }, this.setTempo())

    this.interval = playId
  }

  stop = () => {
    clearInterval(this.interval)
    this.columns[this.currentStep].className = 'column'
    this.steps[this.currentStep].className = ''
  }

  generateBeat = (e) => {
    this.setState({ beat: sequences[e.target.value] })
  }

  changeTempo = (e) => {
    this.tempo = e.target.value
  }

  changeVolume = () => {
    // sound.volume(value);
  }

  clear = () => {
    this.setState({ beat: Array(64).fill(0) })
    this.stop()
  }

  render() {
    return (
      <div className="container">
        <h1>JS-808 Sequencer</h1>
        <Controls 
          play={this.play} 
          stop={this.stop} 
          generateBeat={this.generateBeat} 
          changeTempo={this.changeTempo}
          clear={this.clear} 
          sequences={sequences} 
        />
        <div className="drum-wrapper">
          <div className="header">
            { Array(16).fill(null).map((elem, i) => <span key={i} ref={(elem) => { this.steps[i] = elem} }>{i+1}</span>) }
          </div>
          <div className="types">
            <div className="type">Kick</div>
            <div className="type">Snare</div>
            <div className="type">Open Hat</div>
            <div className="type">Closed Hat</div>
          </div>
          <div className="keys">
            { this.renderKeys() }
          </div>
        </div>
      </div>
    )
  }
}

export default DrumMachine
