import React from 'react'
import PropTypes from 'prop-types'

const Key = ({ active, updateBeat, row, column }) => {
  return (
    <div 
      className={active ? 'key active' : 'key'} 
      onClick={() => updateBeat(row, column)}
    >
    </div>
  )
}

Key.propTypes = {
  active: PropTypes.number.isRequired,
  updateBeat: PropTypes.func.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired
}

export default Key