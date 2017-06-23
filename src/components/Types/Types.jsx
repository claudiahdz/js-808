import React from 'react'
import PropTypes from 'prop-types'

const Types = ({ changeVolume, volumes }) => {
  const types = ['Kick', 'Snare', 'Open Hat', 'Closed Hat']

  return (
    <div className="types">
      { types.map((type, i) => { return (
          <div className="type" key={i}>
            {type}
            <input type="range" value={volumes[i]} onChange={(e) => changeVolume(i, e.target.value)} /> 
            <div>Volume</div>
          </div>
        )}) 
      }
    </div>
  )
}

Types.propTypes = {
  changeVolume: PropTypes.func.isRequired,
}


export default Types
