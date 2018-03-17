import './style.css'
import React from 'react'
import Board from '../board/script.js';
import Button from '../button/script.js';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.onSquareClick = this.onSquareClick.bind(this)
    this.addStep = this.addStep.bind(this)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      step_number: 0
    }
  }

  onSquareClick(sq_idx){
    const history = this.state.history.slice(0, this.state.step_number + 1);
    const current = history[this.state.step_number]
    const squares = current.squares.slice()

    squares[sq_idx] = squares[sq_idx] ? '':'O'
    current.squares = squares

    this.setState({
      history: history,
    })
  }

  jumpTo(step, event){
    this.setState({
      step_number: step
    })
  }

  addStep(){
    const history = this.state.history.slice(0, this.state.step_number + 1);
    const current = history[this.state.step_number]
    const squares = current.squares.slice()

    this.setState({
      history: history.concat([{squares:squares}]),
      step_number: history.length
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.step_number]
    const moves = history.map((step, move)=>{
      let board = <Board
            squares={step.squares}
          />

      return (
        <li key={move}>
          <div onClick={(e)=>this.jumpTo(move, e)}>
            {board}
          </div>
        </li>
      )
    })

    return (
      <div className="app">
        <div className="app-board">
          <Board
            squares={current.squares}
            onSquareClick={this.onSquareClick}
          />
        </div>
        <div className="app-info">
          <ol>{moves}</ol>
        </div>
        <div className="app-control">
          <Button
            text="Add step"
            onClick={this.addStep}
          />
        </div>
      </div>
    );
  }
}