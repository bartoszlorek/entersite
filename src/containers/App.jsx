import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { bind } from '../.utils/react-utils'
import { Bucket } from '../.utils/react-splash'

import { Splash, Handle } from '../components/Splash'
import MenuContainer from './MenuContainer'
import ImageContainer from './ImageContainer'
import styles from '../styles'

class App extends React.Component {
    constructor(props) {
        super(props)
        bind(this, ['content'])
    }

    content(splash) {
        return (
            <div className={this.props.className}>
                <MenuContainer />
                <ImageContainer />
            </div>
        )
    }

    render() {
        return (
            <Bucket
                Splash={Splash}
                Handle={Handle}
                delay={1250}
            >
                {this.content}
            </Bucket>
        )
    }
}

export default styled(App)`
    @media (min-width: 600px) {
        & {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }
    }
`

injectGlobal(styles)
