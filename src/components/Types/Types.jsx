import React from 'react'
import PropTypes from 'prop-types'

const Types = ({ changeVolume }) => {
  const types = ['Kick', 'Snare', 'Open Hat', 'Closed Hat']

  return (
    <div className="types">
      { types.map((type, i) => { return (
          <div className="type" key={i}>
            {type}
            <div>
                <span onClick={() => {changeVolume(i, 1)}}>+</span>
                <span onClick={() => {changeVolume(i, 0)}}>-</span>
            </div>
          </div>


        )}) }
    </div>
  )
}

Types.propTypes = {
  changeVolume: PropTypes.func.isRequired,
}


export default Types
