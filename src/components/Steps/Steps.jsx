import React from 'react'
import PropTypes from 'prop-types'

const Steps = ({ status, currentStep }) => {
  let active
  let steps = []

  Array.from(Array(16)).map((elem, i) => {
    active = (currentStep === i) && (status === 'play')
    return steps.push(
      <span key={i} className={active ? 'active' : ''}}>
        {i+1}
      </span>
    )
  })

  return (
    <div className="steps">
      {steps}
    </div>
  )
}

Steps.propTypes = {
  status: PropTypes.string.isRequired,
  currentStep: PropTypes.number.isRequired
}

export default Steps
