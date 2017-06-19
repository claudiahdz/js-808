import React from 'react'

const Steps = ({ status, currentStep }) => {
  let active
  let steps = []

  Array.from(Array(16)).map((elem, i) => {
    active = (currentStep === i) && (status === 'play')
    return steps.push(
      <span key={i} className={`${active && 'active'}`}>
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

export default Steps
