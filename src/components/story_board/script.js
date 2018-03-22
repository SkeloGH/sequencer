/** Main dependencies */
import './style.scss'
import React from 'react'

/** UI Framework modules */
import Columns from 'grommet/components/Columns'
import Box from 'grommet/components/Box'
import Value from 'grommet/components/Value'

/** Custom dependencies */
import Board from '../board/script.js'

/** Component definition */
export default class StoryBoard extends React.Component {
    getStory(){
        const active_num = this.props.story.active_num
        return this.props.story.items.map((item, move_num) => {
            let attrs = {
                container: {
                    index_name: move_num,
                    className: "story__item",
                    justify: 'center',
                    responsive: false,
                    size: 'small',
                },
                value_box: {
                    align: 'center',
                    margin: 'small',
                    pad: 'small',
                    size: 'small',
                    value: move_num + 1,
                },
                board_box: {
                    squares: item.squares,
                }
            }

            if (active_num === move_num) {
                attrs.container.className += " active"
            }

            return (
                <StoryItem key={move_num} {...attrs} />
            )
        })
    }

    render(){
        const Story = this.getStory()
        return (
            <Box {...this.props.container}>
                {Story}
            </Box>
        )
    }
}

class StoryItem extends React.Component {
    shouldComponentUpdate(nextProps, nextState){
        const attrs      = this.props
        const container  = attrs.container
        const _container = nextProps.container
        const board_box  = attrs.board_box
        const _board_box = nextProps.board_box

        return (container.className !== _container.className ||
        board_box.squares !== _board_box.squares)
    }
    render(){
        const attrs = this.props
        return (
            <Columns {...attrs.container}>
                <ValueBox {...attrs.value_box} />
                <BoardBox {...attrs.board_box} />
            </Columns>
        )
    }
}

class ValueBox extends React.PureComponent {
    render(){
        const attrs = this.props
        return (
            <Box {...attrs} >
                <Value value={attrs.value} />
            </Box>
        )
    }
}

class BoardBox extends React.PureComponent {
    render(){
        const attrs = this.props
        return (
            <Box>
                <Board squares={attrs.squares} />
            </Box>
        )
    }
}