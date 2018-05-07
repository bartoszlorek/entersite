import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Box = styled.div`
    position: relative;

    &:before {
        content: '';
        display: block;
        padding-top: ${({ aspect }) => 100 / aspect}%;
        height: 0;
    }

    & > * {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
`

Box.propTypes = {
    aspect: PropTypes.number
}

Box.defaultProps = {
    aspect: 1
}

export default Box
