import React, { Component } from 'react'
import { sounds, sequences } from 'config'

class Controls extends Component {

  constructor(props) {
    super(props)
    this.interval = null
    this.currentStep = 0
    this.oldStep = 15
    this.tempo = 60
    this.state = {
      status: 'stop',
    }
  }

  // Controls
  play = () => {
    const { columns, steps } = this.props
    let currentStep = this.currentStep
    let oldStep = this.oldStep

    const tempo = (1000 / (this.tempo * 2) * 60)

    this.setState({ status: 'play' })

    let playId = setInterval(() => {
      columns[oldStep].className = 'column'
      columns[currentStep].className = 'column active'

      steps[oldStep].className = ''
      steps[currentStep].className = 'active'

      Array.from(columns[currentStep].children).forEach((elem, i) => {
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

      this.currentStep = currentStep
      this.oldStep = oldStep

    }, tempo)

    this.interval = playId
  }

  stop = () => {
    const { columns, steps } = this.props
    clearInterval(this.interval)
    columns[this.oldStep].className = 'column'
    steps[this.oldStep].className = ''
    this.currentStep = 0
    this.oldStep = 15
    this.setState({ status: 'stop' })
  }

  pause = () => {
    this.setState({ status: 'pause' })
    clearInterval(this.interval)
  }

  clear = () => {
    this.stop()
    this.props.updateBeat(Array(4).fill(Array(16).fill(0)))
  }

  // Options
  changeTempo = (e) => {
    this.pause()
    this.tempo = e.target.value
    if (this.state.status === 'play') {
        this.play()
    }
  }

  changeVolume = () => {
    // sound.volume(value);
  }

  render () {
    const { updateBeat } = this.props
    const isPlaying = this.state.status === 'play'

    const tempos = () => {
      let tempos = []
      for(let i = 60; i <= 180; i=i+20) {
        tempos.push(<option key={i} value={i}>{`${i} BMP`}</option>)   
      }
      return tempos
    }
    
    return (
      <div className="buttons">
        <div className="button" onClick={isPlaying ? this.pause : this.play}>{isPlaying ? 'Pause' : 'Play'}</div>
        <div className="button" onClick={this.stop}>Stop</div>
        <select className="button" onChange={(e) => updateBeat(sequences[e.target.value])}>
          <option value={0}>4 on the floor</option>
          { sequences.slice(1).map((elem, i) => <option value={++i} key={i}>Sequence {i}</option>) }
        </select>
        <select className="button" onChange={this.changeTempo}>
          { tempos() }     
        </select> 
        <div className="button" onClick={this.clear}>Clear</div>
      </div>    
    )
  }
}

export default Controls