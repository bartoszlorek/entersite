import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { bind } from '../.utils/react-utils'

import MenuContainer from './MenuContainer'
import ImageContainer from './ImageContainer'
import styles from '../styles'

class App extends React.Component {
    constructor(props) {
        super(props)
        bind(this, [
            'handleViewingImage'
        ])
    }

    handleViewingImage(elems) {
        let group = (elems[0] && elems[0].getAttribute('data-group')) || ''
        console.log(group)
    }

    render() {
        return (
            <div className={this.props.className}>
                <MenuContainer />
                <ImageContainer onView={this.handleViewingImage} />
            </div>
        )
    }
}

export default styled(App)`
    @media (min-width: 600px) {
        & {
            display: flex;
            align-items: flex-start;
        }
    }
`

injectGlobal(styles)
