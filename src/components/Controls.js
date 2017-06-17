import React from 'react';

const Controls = ({ play, stop, generateBeat, changeTempo, clear, sequences }) => {
  return (
    <div className="buttons">
      <div className="button" onClick={play}>Play</div>
      <div className="button" onClick={stop}>Stop</div>
      <select className="button" onChange={generateBeat}>
        <option value={0}>4 on the floor</option>
        { sequences.slice(1).map((elem, i) => <option value={++i} key={i}>Sequence {i}</option>) }
      </select>
      <select className="button" onChange={changeTempo}>
        <option value={60}>60 BMP</option>   
        <option value={120}>120 BMP</option>      
        <option value={180}>180 BMP</option>      
      </select> 
      <div className="button" onClick={clear}>Clear</div>
    </div>    
  )
}

export default Controls