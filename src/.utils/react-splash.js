import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const STATE_LOADING = 'loading'
export const STATE_DISPOSE = 'dispose'
export const STATE_HIDDEN = 'hidden'

class Bucket extends React.Component {
    constructor(props) {
        super(props)
        const { duration, delay } = props

        this.state = {
            visibility: STATE_LOADING,
            duration,
            delay
        }
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.setState({
                    visibility: STATE_DISPOSE
                })
                setTimeout(() => {
                    this.setState({
                        visibility: STATE_HIDDEN
                    })
                }, duration)
            }, delay)
        })
    }

    render() {
        const { render, Splash } = this.props

        if (this.state.visibility === STATE_HIDDEN) {
            return render != null ? render(this.state) : null
        }
        return (
            <div>
                {render != null && render(this.state)}
                <Splash {...this.state} />
            </div>
        )
    }
}

Bucket.propTypes = {
    Splash: PropTypes.func.isRequired,
    duration: PropTypes.number,
    delay: PropTypes.number,
    render: PropTypes.func
}

// in milliseconds
Bucket.defaultProps = {
    duration: 1000,
    delay: 500,
    render: null
}

class Splash extends React.PureComponent {
    render() {
        return <div className={this.props.className} />
    }
}

Splash = styled(Splash)`
    position: fixed;
    background: #141414;
    z-index: 99999;
    left: 0;
    top: 0;
    right: 0;
    bottom: ${props => (props.visibility === STATE_LOADING ? 0 : '100%')};
    transition: bottom ${props => props.duration}ms;
`

export { Bucket, Splash }
