/** Main dependencies */
import './style.scss'
import React from 'react'

/** UI Framework modules */
import Box from 'grommet/components/Box'

/** UI Framework icons */
import RewindIcon from 'grommet/components/icons/base/Rewind'
import PlayIcon from 'grommet/components/icons/base/Play'
import PauseIcon from 'grommet/components/icons/base/Pause'
import FastForwardIcon from 'grommet/components/icons/base/FastForward'


export default class PlayerBox extends React.Component {
    constructor(props){
        super(props)
        this.button_size = this.props.buttonSize || "small"
    }

    renderPlaybackToggle(size) {
        if (this.props.playing) {
            return <PauseIcon size={size} type="control" onClick={this.props.onPause} />
        } else {
            return <PlayIcon size={size} type="control" onClick={this.props.onPlay} />
        }
    }
    
    render(){
        const button_size = this.button_size
        
        return (
            <Box
                alignSelf="center"
                basis="full"
                direction="row"
                pad="small"
            >
                <Box className="player_box__rewind_box">
                    <RewindIcon size={button_size} type="control" onClick={this.props.onRewind} />
                </Box>
                <Box className="player_box__toggle_box" pad={{ horizontal: button_size }}>
                    {this.renderPlaybackToggle(button_size)}
                </Box>
                <Box className="player_box__forward_box">
                    <FastForwardIcon size={button_size} type="control" onClick={this.props.onForward} />
                </Box>
            </Box>
        )
    }
}