import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { omit } from '../.utils/react-utils'

class Link extends React.PureComponent {
    render() {
        let props = omit(this.props, [
            'color',
            'defaultBackgroundColor',
            'activeBackgroundColor'
        ])
        return (
            <a {...props}>
                <span>{props.children}</span>
            </a>
        )
    }
}

const noTouch = '.no-touchevents'
const styledLink = styled(Link)`
    &,
    &:visited,
    &:focus,
    &:active,
    &:hover {
        color: ${props => props.color};
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        text-decoration: none;
        overflow: visible;
        outline: 0;
    }

    & span {
        height: 0.65em;
        display: inline-block;
        border-bottom: 0.75em solid;
        border-bottom-color: ${props => props.defaultBackgroundColor};
    }

    &:focus span,
    &:active span,
    &:hover span {
        border-bottom-color: ${props => props.activeBackgroundColor};
    }
`

styledLink.propTypes = {
    color: PropTypes.string,
    defaultBackgroundColor: PropTypes.string,
    activeBackgroundColor: PropTypes.string
}

styledLink.defaultProps = {
    color: '#222',
    defaultBackgroundColor: 'transparent',
    activeBackgroundColor: '#c2e08e'
}

export default styledLink
