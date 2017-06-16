import React, { Component } from 'react'
import { Howl } from 'howler'
import './DrumMachine.css';

import kick from './audio/kick.mp3'
import snare from './audio/snare.mp3'
import open from './audio/open.mp3'
import close from './audio/close.mp3'

import Key from './components/Key'

const _4ONTHEFLOOR = [
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
]

const _CLAUDIACOOL = [
  [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
]

const sounds = [
  new Howl({
      src: [kick]
  }), 
  new Howl({
      src: [snare]
  }), 
  new Howl({
      src: [open]
  }), 
  new Howl({
      src: [close]
  }),
]

class DrumMachine extends Component {

  constructor(props) {
    super(props)
    this.columns = []
    this.state = {
      beat: Array(4).fill(Array(16).fill(false)),
      interval: null,
      tempo: 180,
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return !(this.state.interval !== nextState.interval)
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
    return (1000 / (this.state.tempo * 2) * 60)
  }

  playBeat = () => {
    let currentStep = 0
    let oldStep = 15

    let playId = setInterval(() => {      
      this.columns[oldStep].className = 'column'
      this.columns[currentStep].className = 'column active'

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
    }, this.setTempo())

    this.setState({ 
      interval: playId,
    })
  }

  stopBeat = () => {
    const { interval } = this.state
    clearInterval(interval)
    this.columns.forEach((elem) => {
      elem.className = 'column'
    })
  }

  generateBeat = () => {
    this.setState({ beat: _4ONTHEFLOOR })
  }

  generateOTHERBeat = () => {
    this.setState({ beat: _CLAUDIACOOL })
  }

  eraseBeat = () => {
    this.setState({ beat: Array(64).fill(false) })
    this.stopBeat()
  }

  render() {
    return (
      <div className="container">
        <h1>JS-808 Sequencer</h1>
        <div className="buttons">
          <div className="button" onClick={this.playBeat}>PLAY BEAT</div>
          <div className="button" onClick={this.stopBeat}>STOP BEAT</div>
          <div className="button" onClick={this.generateBeat}>NEW BEAT</div>
          <div className="button" onClick={this.generateOTHERBeat}>OTHER BEAT</div>
          <div className="button" onClick={this.eraseBeat}>ERASE BEAT</div>
        </div>
        <div className="drum-wrapper">
          <div className="types">
            <div className="type">Kick</div>
            <div className="type">Snare</div>
            <div className="type">Open Hat</div>
            <div className="type">Closed Hat</div>
          </div>
          <div className="header">
            { Array(16).fill(null).map((elem, i) => <span key={i}>{i+1}</span>) }
          </div>
          <div className="keys">
            { this.renderKeys() }
          </div>
        </div>
      </div>
    )
  }
}

export default DrumMachine;
