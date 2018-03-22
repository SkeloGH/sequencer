/** Main dependencies */
import 'grommet'
import 'grommet/scss/vanilla/index.scss'
import React from 'react'

/** UI Framework modules */
import App     from 'grommet/components/App'
import Button  from 'grommet/components/Button'
import Header  from 'grommet/components/Header'
import Section from 'grommet/components/Section'
import Split   from 'grommet/components/Split'

/** Custom dependencies */
import './style.scss'
import Board from '../board/script.js'
import StoryBoard from '../story_board/script.js'
import PlayerBox from '../player_box/script.js'

/** Component definition */
export default class Main extends React.PureComponent {
  constructor(props){
    super(props)
    this.timerMs = 500
    this.theme = {
      bar_bg: "neutral-4-a",
      split_bg_1: "neutral-4",
      split_bg_2: "light-2",
    }
    this.onStoryClick  = this.onStoryClick.bind(this)
    this.onSquareClick = this.onSquareClick.bind(this)
    this.playbackTimer = null
    this.resume     = this.resume.bind(this)
    this.forward    = this.forward.bind(this)
    this.rewind     = this.rewind.bind(this)


    this.addStep = this.addStep.bind(this)
    this.state   = {
      playing: false,
      story: [{
        squares: Array(9).fill(null),
      }],
      step_number: 0
    }
  }

  onSquareClick(sq_idx){
    const story   = this.state.story.slice()
    const current = story[this.state.step_number]
    const squares = current.squares.slice()

    squares[sq_idx] = squares[sq_idx] ? '':'O'
    current.squares = squares

    this.setState({
      story: story,
    })
  }

  resume(){
    let playing = false
    let next    = this.state.step_number
    if (this.state.step_number < this.state.story.length - 1) {
      playing = true
      next    = this.state.step_number + 1
      this.jumpTo(next)
      this.playbackTimer = setTimeout(this.resume, this.timerMs);
    }

    this.setState({
      playing: playing
    })
  }

  pause(){
    this.setState({
      playing: false
    })
    clearTimeout(this.playbackTimer)
  }

  forward(){
    if (this.state.story.length) {
      this.jumpTo(this.state.story.length - 1)
      this.setState({
        playing: false
      })
    }
  }

  rewind() {
    this.jumpTo(0)
  }

  jumpTo(step){
    this.setState({
      step_number: step
    })
  }

  addStep(){
    const step_number = this.state.step_number;
    const story       = this.state.story.slice()
    const squares     = Array(9).fill(null)

    this.setState({
      story: story.concat([{squares:squares}]),
      step_number: step_number+1
    })
  }

  onStoryClick(event){
    const elem = event.target
    let target_step = null

    if (elem.classList.contains('story__item')){
      target_step = elem.getAttribute('index_name')

      if (target_step) {
        this.jumpTo(parseInt(target_step, 10))
      }
    }else{
      this.onStoryClick({target: elem.offsetParent})
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {}

  render() {
    const theme   = this.theme
    const story   = this.state.story
    const current = story[this.state.step_number]
    const attrs   = {
      App: {
        centered: false
      },
      Layout: {
        priority:"left",
        fixed:true,
        showOnResponsive:"both",
      },
      PreviewSection: {
        className: "stage__main",
        colorIndex: theme.split_bg_1,
        full: true,
        pad: {
          horizontal: 'medium',
          vertical: 'medium',
        }
      },
      PreviewScreen: {
        squares: current.squares,
        onSquareClick: this.onSquareClick
      },
      PlayerBox: {
        buttonSize: "small",
        playing: this.state.playing,
        onPlay: this.resume,
        onPause: this.pause,
        onForward: this.forward,
        onRewind: this.rewind,
      },
      StorySection: {
        className:"story__main",
        colorIndex: theme.split_bg_2,
        pad: "none",
      },
      StoryHeader: {
        container: {
          colorIndex: theme.bar_bg,
          fixed: true,
          direction: "row",
          justify: "between",
          size: "small",
          pad: {
            horizontal: 'medium',
            vertical: 'medium',
          }
        },
        button: {
          label:"+ Add step",
          onClick: this.addStep,
        },
      },
      StoryBoard: {
        container: {
            onClick: this.onStoryClick,
            className: "story__list",
            pad: {
              vertical: 'small'
            }
        },
        story: {
          items: this.state.story,
          active_num: this.state.step_number
        }
      }
    }
    /**                   App
     *  +-------------------------------------+
     *  |                Layout               |
     *  | +-----------------+---------------+ |
     *  | |  Section        |  Section      | |
     *  | | +-------------+ | +-----------+ | |
     *  | | |   Preview   | | |   Story   | | |
     *  | | +-------------+ | +-----------+ | |
     *  | +-----------------+---------------+ |
     *  +-------------------------------------+
     */
    return (
      <App {...attrs.App}>
        <Split {...attrs.Layout}>
          <Section {...attrs.PreviewSection}>
            <Board {...attrs.PreviewScreen} />
            <PlayerBox {...attrs.PlayerBox} />
          </Section>

          <Section {...attrs.StorySection}>
            <StoryHeader {...attrs.StoryHeader} />
            <StoryBoard {...attrs.StoryBoard} />
          </Section>

        </Split>
      </App>
    )
  }
}

class StoryHeader extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    return false
  }
  render(){
    const attrs = this.props
    return (
      <Header { ...attrs.container }>
        <Button {...attrs.button} />
      </Header >
    )
  }
}