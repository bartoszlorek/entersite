import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Caption from './Caption'

class Image extends React.PureComponent {
    render() {
        let { caption, className } = this.props
        return (
            <div className={className}>
                <img {...this.props} className={null} caption={null} />
                {caption && <Caption>{caption}</Caption>}
            </div>
        )
    }
}

Image.propTypes = {
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    alt: PropTypes.string,
    caption: PropTypes.string
}

Image.defaultProps = {
    src: '',
    width: 0,
    height: 0,
    alt: '',
    caption: ''
}

export default styled(Image)`
    margin: 0 0 24px;

    & img {
        display: block;
        margin: 0 0 8px;
    }

    @media (min-width: 600px) {
        & {
            margin: 0 0 3vw;
        }
    }
`
