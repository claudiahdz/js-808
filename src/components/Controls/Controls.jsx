import React from 'react'
import PropTypes from 'prop-types'
import { sequences } from 'config/config'

const Controls = ({ status, play, stop, pause, clear, changeBeat, changeTempo, tempo } ) => {
  const isPlaying = (status === 'play')

  return (
    <div className="buttons">
      <div className="button" onClick={isPlaying ? pause : play}>{isPlaying ? 'Pause' : 'Play'}</div>
      <div className="button" onClick={stop}>Stop</div>
      <select className="button" onChange={(e) => changeBeat(sequences[e.target.value].map(r => r.slice()))}>
        <option value={0}>4 on the floor</option>
        { sequences.slice(1).map((elem, i) => <option value={++i} key={i}>Sequence {i}</option>) }
      </select>
      <input type="range" min="60" max="180" value={tempo} onChange={(e) => changeTempo(e.target.value)} /> 
      <span>{tempo} BMP</span>
      <div className="button" onClick={clear}>Clear</div>
    </div>    
  )
}

Controls.propTypes = {
  status: PropTypes.string.isRequired,
  tempo: PropTypes.number.isRequired,
  play: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  changeBeat: PropTypes.func.isRequired,
  changeTempo: PropTypes.func.isRequired
}

export default Controls
