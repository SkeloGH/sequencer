import './style.css'
import React from 'react';

export default class Square extends React.Component {
  render(i) {
    return (<div
              className='square'
              value={this.props.value}
              onClick={
                () => this.props.onClick(i)
              }
    >{this.props.value}</div>)
  }
}
