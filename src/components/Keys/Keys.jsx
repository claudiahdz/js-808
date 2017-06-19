import React from 'react'
import Key from 'components/Key/Key'

const Keys = ({ beat, updateBeat, status, currentStep }) => {
  let active
  let column = []
  let columns = []

  for(let i = 0; i < 16; i++) {
    active = (currentStep === i) && (status === 'play')

    for(let j = 0; j < 4; j++) { 

      column.push(<Key key={`row${j}-column${i}`} 
                       active={beat[j][i]}
                       updateBeat={updateBeat}
                       row={j}
                       column={i} 
                  />)
    }

    columns.push(
      <div className={`column ${active && 'active'}`} key={`column${i}`}>
        {column}
      </div>
    )
    column = []
  }
  return (
    <div className="keys">
      {columns}
    </div>
  )
}

export default Keys