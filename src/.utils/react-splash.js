import React from 'react'
import PropTypes from 'prop-types'
import { callRenderProp } from '../.utils/react-utils'

export const LOADING = 'loading'
export const DISPOSE = 'dispose'
export const HIDDEN = 'hidden'

class Bucket extends React.PureComponent {
    constructor(props) {
        super(props)
        const { duration, delay } = props

        this.state = {
            status: LOADING,
            isLoaded: false,
            duration,
            delay
        }

        window.addEventListener('load', () => {
            setTimeout(() => this.setState({
                status: DISPOSE,
                isLoaded: true
            }), delay)

            setTimeout(() => this.setState({
                status: HIDDEN
            }), delay + duration)
        })
    }

    render() {
        const { children, Splash, Handle } = this.props

        if (this.state.status === HIDDEN) {
            return callRenderProp(children, this.state)
        }
        return (
            <div>
                <Handle {...this.state} >
                    {callRenderProp(children, this.state)}
                </Handle>
                <Splash {...this.state} />
            </div>
        )
    }
}

Bucket.propTypes = {
    Splash: PropTypes.func.isRequired,
    Handle: PropTypes.func,
    duration: PropTypes.number,
    delay: PropTypes.number
}

// in milliseconds
Bucket.defaultProps = {
    Handle: props => props.children,
    duration: 1000,
    delay: 500
}

export { Bucket }
