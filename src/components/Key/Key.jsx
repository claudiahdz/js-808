import React from 'react'

const Key = ({ active, updateBeat, row, column }) => {
  return (
    <div className={`key ${active && 'active'}`} 
          onClick={() => updateBeat(row, column)}
    >
    </div>
  )
}

export default Key