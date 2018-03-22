import './style.css'
import React from 'react';

export default class Square extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    return this.props.value !== nextProps.value
  }

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
