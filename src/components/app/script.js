/** Main dependencies */
import 'grommet'
import 'grommet/scss/vanilla/index.scss'
import React from 'react'

/** UI Framework modules */
import App     from 'grommet/components/App'
import Box     from 'grommet/components/Box'
import Button  from 'grommet/components/Button'
import Columns from 'grommet/components/Columns'
import Header  from 'grommet/components/Header'
import Section from 'grommet/components/Section'
import Split   from 'grommet/components/Split'
import Value   from 'grommet/components/Value'

/** Custom dependencies */
import './style.scss'
import Board from '../board/script.js'

/** Component definition */
export default class Main extends React.Component {
  constructor(props){
    super(props)
    this.theme = {
      bar_bg: "neutral-4-a",
      split_bg_1: "neutral-4",
      split_bg_2: "light-2",
    }
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
    const history = this.state.history.slice()
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
    const step_number = this.state.step_number;
    const history = this.state.history.slice()
    const squares = Array(9).fill(null)

    this.setState({
      history: history.concat([{squares:squares}]),
      step_number: step_number+1
    })
  }

  getMoves(){
    const history = this.state.history
    const moves = history.map((step, move) => {
      return (
        <Columns className="story__item" justify='center' size='small'
          responsive={false} key={move}
          onClick={(e) => this.jumpTo(move, e)}
        >
          <Box align='center' pad='small' margin='small' size="small" >
            <Value value={move + 1} />
          </Box>
          <Box>
            <Board squares={step.squares} />
          </Box>
        </Columns>
      )
    })
    return moves
  }

  render() {
    const theme = this.theme
    const history = this.state.history
    const current = history[this.state.step_number]
    const moves = this.getMoves()

    return (
      <App centered={false}>
        <Split priority="left" fixed={true} showOnResponsive="both">
          <Section
            className="stage__main"
            colorIndex={theme.split_bg_1}
            full={true}
            pad={{
              horizontal: 'medium',
              vertical: 'medium',
            }}
          >
            <Board
              squares={current.squares}
              onSquareClick={this.onSquareClick}
            />
          </Section>
          <Section
            className="story__main"
            colorIndex={theme.split_bg_2}
            // full={true}
            pad="none"
          >
            <Header colorIndex={theme.bar_bg} fixed={true}
              direction="row" justify="between" size="small"
              pad={{ horizontal: 'medium', vertical: 'medium', }}
            >
              <Button label="Add step" onClick={this.addStep} />
            </Header>
            <Box className="story__list" pad={{ vertical: 'small' }}>{moves}</Box>
          </Section>
        </Split>
      </App>
    )
  }
}