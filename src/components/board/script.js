import './style.css'
import React from 'react';
import Square from '../square/script.js';

export default class Board extends React.Component {
  renderSquare(idx) {
    return (<Square
              value={this.props.squares[idx]}
              onClick={() => {
                return this.props.onSquareClick && this.props.onSquareClick(idx)}}
            />)
  }

  shouldComponentUpdate(nextProps, nextState){
    return !this.has_changed
  }

  render() {
    this.has_changed = false
    return (
      <div className="board__main">
        <div className="board__row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board__row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board__row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
