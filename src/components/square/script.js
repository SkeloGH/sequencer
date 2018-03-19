import './style.css'
import React from 'react';
import Button from '../button/script.js';

export default class Square extends React.Component {
  render(i) {
    return (<Button
              className='square'
              text={this.props.value}
              value={this.props.value}
              onClick={
                () => this.props.onClick(i)
              }
            />)
  }
}
