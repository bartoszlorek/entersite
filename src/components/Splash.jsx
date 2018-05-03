import React from 'react'
import styled from 'styled-components'
import createViewport from '../.utils/viewport'

import { BASE } from '../../config'
import Loader from './Loader'

const Wrap = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    height: 100vh;
`

const SplashLoader = Loader.extend`
    position: absolute;
    right: 24px;
    bottom: 36px;
    width: 64px;

    @media (min-width: 600px) {
        & {
            right: 6vw;
            bottom: 6vw;
        }
    }

    @media (min-width: 1200px) {
        & {
            width: 4%;
            width: 4vw;
        }
    }
`

class RawSplash extends React.PureComponent {
    constructor(props) {
        super(props)

        this.viewport = createViewport({
            onResize: {
                args: ['height']
            }
        })
        this.state = {
            height: this.viewport.height()
        }
    }

    componentDidMount() {
        this.viewport.onResize(height => {
            this.setState({ height })
        })
    }

    componentWillUnmount() {
        this.viewport.removeEvent('onResize')
    }

    render() {
        let style = {
            height: this.state.height + 'px'
        }
        return (
            <div className={this.props.className}>
                <Wrap style={style}>
                    <SplashLoader
                        src={BASE + 'loader.svg'}
                        width={64}
                        height={64}
                        frames={5}
                    />
                </Wrap>
            </div>
        )
    }
}

export const Splash = styled(RawSplash)`
    position: fixed;
    background: #34495e;
    z-index: 99999;
    top: 0;
    left: 0;
    right: 0;
    bottom: ${props => (props.isLoaded ? '100%' : 0)};
    transition: bottom ${props => props.duration}ms;
    overflow: hidden;
`

export const Handle = styled.div`
    transform: translate(0, ${props => (props.isLoaded ? 0 : 125)}px);
    transition: transform ${props => props.duration}ms;
    -webkit-backface-visibility: hidden;
`
