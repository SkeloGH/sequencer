/** 3rd-party dependencies */
import 'grommet'
import 'grommet/scss/vanilla/index.scss'
import React from 'react'
/** UI Framework modules */
import App     from 'grommet/components/App'
import Section from 'grommet/components/Section'
import Split   from 'grommet/components/Split'
/** Component dependencies */
import './style.scss'
import APP_DEFAULTS from './defaults.js'
/** Custom components */
import Board        from '../board/script.js'
import StoryBoard   from '../story_board/script.js'
import StoryHeader  from '../story_header/script.js'
import PlayerBox    from '../player_box/script.js'

/** Component definition */
export default class Main extends React.PureComponent {
  constructor(props){
    super(props)
    let config         = APP_DEFAULTS
    this.playbackTimer = null
    this.timerMs       = 500
    this.addStep       = this.addStep.bind(this)
    this.forward       = this.forward.bind(this)
    this.onSquareClick = this.onSquareClick.bind(this)
    this.onStoryClick  = this.onStoryClick.bind(this)
    this.onKeyDown     = this.onKeyDown.bind(this)
    this.onKeyUp       = this.onKeyUp.bind(this)
    this.resume        = this.resume.bind(this)
    this.rewind        = this.rewind.bind(this)

    config.StoryHeader.button.onClick   = this.addStep
    config.StoryBoard.container.onClick = this.onStoryClick
    config.PlayerBox.onForward          = this.forward
    config.PlayerBox.onPause            = this.pause
    config.PlayerBox.onPlay             = this.resume
    config.PlayerBox.onRewind           = this.rewind
    config.PreviewScreen.onSquareClick  = this.onSquareClick

    this.UI_cfg        = config
    this.state         = {
      step_number: 0,
      playing: false,
      active_keys: Array(9).fill(this.UI_cfg.tile_empty),
      story: [{
        squares: Array(9).fill(this.UI_cfg.tile_empty),
      }],
    }
  }

  /*
   * Class utility methods
  */
  getCurrentSquares() {
    const story = this.state.story.slice()
    const current = story[this.state.step_number]
    const squares = current.squares.slice()
    return squares
  }

  setActiveKeyState(key_code, value) {
    const key_map = this.UI_cfg.KeyMap.slice()
    const new_map = this.state.active_keys.slice()
    const key_index = key_map.indexOf(key_code)

    if (key_index > -1) {
      new_map[key_index] = value
    }

    this.setState({
      active_keys: new_map
    })
  }

  /*
   * Event listeners
  */
  onSquareClick(sq_idx){
    const story   = this.state.story.slice()
    const current = story[this.state.step_number]
    const squares = current.squares.slice()

    if (squares[sq_idx] === this.UI_cfg.tile_fill){
      squares[sq_idx] = this.UI_cfg.tile_empty
    }else{
      squares[sq_idx] = this.UI_cfg.tile_fill
    }
    current.squares = squares

    this.setState({
      story: story,
    })
  }

  onStoryClick(event) {
    const elem = event.target
    let target_step = null

    if (elem.classList.contains('story__item')) {
      target_step = elem.getAttribute('index_name')

      if (target_step) {
        this.jumpTo(parseInt(target_step, 10))
      }
    } else {
      this.onStoryClick({ target: elem.offsetParent })
    }
  }

  onKeyDown(e) {
    this.setActiveKeyState(e.key, this.UI_cfg.tile_fill)
  }

  onKeyUp(e) {
    const squares = this.getCurrentSquares()
    const new_map = this.state.active_keys.slice()
    const squares_str = squares.join('')
    const key_map_str = new_map.join('')

    if (squares_str === key_map_str) {
      this.next()
    }
    this.setActiveKeyState(e.key, this.UI_cfg.tile_empty)
  }
  /*
   * UI methods
  */
  resume(){
    let playing = this.next((idx) => {
      this.playbackTimer = setTimeout(this.resume, this.timerMs);
    })

    this.setState({
      playing: playing
    })
  }

  next(cb){
    let has_next = this.state.step_number < this.state.story.length - 1

    if (has_next) {
      this.jumpTo(this.state.step_number + 1)
      if (typeof cb === "function") {
        cb(this.state.step_number + 1)
      }
    }
    return has_next
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
    const squares     = Array(9).fill(this.UI_cfg.tile_empty)

    this.setState({
      story: story.concat([{squares:squares}]),
      step_number: step_number+1
    })
  }
  /*
   * Component methods
  */
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  render() {
    const story   = this.state.story
    const current = story[this.state.step_number]
    const attrs   = this.UI_cfg

    attrs.PreviewScreen.squares       = current.squares
    attrs.PlayerBox.playing           = this.state.playing
    attrs.StoryBoard.story.items      = this.state.story
    attrs.StoryBoard.story.active_num = this.state.step_number

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
