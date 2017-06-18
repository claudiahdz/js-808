import React from 'react'
import { shallow } from 'enzyme'
import Keys from 'components/Keys/Keys'

describe('Keys', () => {
  const defaultProps = {
    beat: Array(4).fill(Array(16).fill(0)),
    columns: () => {},
    updateBeat: () => {},
  }

  it('renders 64 keys', () => {
    const props = {
      ...defaultProps,
    }

    const keys = shallow(
      <Keys {...props} />
    )
    expect(keys).toMatchSnapshot()
  })
})

