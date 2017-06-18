import React from 'react'
import Key from 'components/Key/Key'

const Keys = ({ beat, columns }) => {
  let column = []
  let clmns = []

  for(let i = 0; i < 16; i++) {
    for(let j = 0; j < 4; j++) { 
      column.push(<Key key={`row${j}-column${i}`} 
                       active={beat[j][i]} 
                  />)
    }
    clmns.push(
      <div className="column" key={`column${i}`} ref={(elem) => { columns[i] = elem} }>
        {column}
      </div>
    )
    column = []
  }
  return (
    <div className="keys">
      {clmns}
    </div>
  )
}

export default Keys