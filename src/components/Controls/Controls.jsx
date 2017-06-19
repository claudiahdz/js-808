import React from 'react'
import { sequences } from 'config/config'

const Controls = ({ status, play, stop, pause, clear, changeBeat, changeTempo }) => {
  const isPlaying = (status === 'play')
  const tempos = (() => {
    let tempos = []
    for(let i = 60; i <= 180; i=i+20) {
      tempos.push(<option key={i} value={i}>{`${i} BMP`}</option>)   
    }
    return tempos
  })()
  
  return (
    <div className="buttons">
      <div className="button" onClick={isPlaying ? pause : play}>{isPlaying ? 'Pause' : 'Play'}</div>
      <div className="button" onClick={stop}>Stop</div>
      <select className="button" onChange={(e) => changeBeat(sequences[e.target.value])}>
        <option value={0}>4 on the floor</option>
        { sequences.slice(1).map((elem, i) => <option value={++i} key={i}>Sequence {i}</option>) }
      </select>
      <select className="button" onChange={(e) => changeTempo(e)}>
        { tempos }     
      </select> 
      <div className="button" onClick={clear}>Clear</div>
    </div>    
  )
}

export default Controls
