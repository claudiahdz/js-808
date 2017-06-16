import React, { Component } from 'react';

class Key extends Component {

  state = {
    active: false,
  }

  componentWillMount = () => {
    this.init(this.props)
  }

  componentWillReceiveProps = (nextProps) => {
    this.init(nextProps)
  }

  init = (props) => {
    this.setState({
      active: props.active || false,
    })
  }

  onPressKey = () => {
    this.setState({ active: !this.state.active })
  }

  render() {
    const { active } = this.state

    return (
      <div className={`key ${active && 'active'}`} onClick={this.onPressKey}></div>
    )
  }
}

export default Key;