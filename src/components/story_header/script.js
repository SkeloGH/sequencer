/** Main dependencies */
import React from 'react'
/** UI Framework modules */
import Button from 'grommet/components/Button'
import Header from 'grommet/components/Header'

export default class StoryHeader extends React.Component {
    constructor(props){
        super(props)
        this.static = !!this.props.static
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !this.static
    }
    render() {
        const attrs = this.props
        return (
            <Header {...attrs.container}>
                <Button {...attrs.button} />
            </Header >
        )
    }
}