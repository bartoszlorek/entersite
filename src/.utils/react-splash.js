import React from 'react'
import PropTypes from 'prop-types'

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
        const { Splash, Handle, children } = this.props

        if (this.state.status === HIDDEN) {
            return children != null ? children(this.state) : null
        }
        return (
            <div>
                <Handle {...this.state} >
                    {children != null && children(this.state)}
                </Handle>
                <Splash {...this.state} />
            </div>
        )
    }
}

Bucket.propTypes = {
    Splash: PropTypes.func.isRequired,
    Handle: PropTypes.func,
    children: PropTypes.func,
    duration: PropTypes.number,
    delay: PropTypes.number
}

// in milliseconds
Bucket.defaultProps = {
    Handle: props => props.children,
    children: null,
    duration: 1000,
    delay: 500
}

export { Bucket }
