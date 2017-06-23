import React from 'react'
import PropTypes from 'prop-types'

import Key from 'components/Key/Key'


const Keys = ({ beat, updateBeat, status, currentStep }) => {
  let active
  let column = []
  let columns = []

  // Columns
  for(let i = 0; i < 16; i++) {
    active = (currentStep === i) && (status === 'play' || status === 'pause')

    // Rows
    for(let j = 0; j < 4; j++) { 
      column.push(
        <Key 
          key={`row${j}-column${i}`} 
          active={beat[j][i]}
          updateBeat={updateBeat}
          row={j}
          column={i} 
        />
      )
    }

    columns.push(
      <div className={active ? 'column active' : 'column'} key={`column${i}`}>
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

Keys.propTypes = {
  beat: PropTypes.array.isRequired,
  updateBeat: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired
}

export default Keys