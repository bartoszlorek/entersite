import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const SVG_ATTRS = {
    width: '100%',
    preserveAspectRatio: 'xMinYMin slice',
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink'
}

class Loader extends React.PureComponent {
    render() {
        let { className, src, width, height, frames } = this.props
        return (
            <div className={className}>
                <svg {...SVG_ATTRS} viewBox={`0 0 ${width} ${height}`}>
                    <image
                        xlinkHref={src}
                        width={width * frames + 'px'}
                        height={height + 'px'}
                    />
                </svg>
            </div>
        )
    }
}

Loader.propTypes = {
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    frames: PropTypes.number
}

Loader.defaultProps = {
    src: '',
    width: 0,
    height: 0,
    frames: 0
}

const loading = ({ frames }) => {
    let x = -frames * 100 + '%'
    return keyframes`
        from { transform: translateX(0%); }
        to { transform: translateX(${x}); } 
    `
}

export default styled(Loader)`
    position: relative;
    width: ${props => props.width}px;

    &:before {
        content: '';
        display: block;
        padding-top: ${({ width, height }) => height / width * 100}%;
        height: 0;
    }

    & > svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    & > svg image {
        animation: ${loading} 1s steps(5) infinite;
    }
`
