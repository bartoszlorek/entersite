import React from 'react'
import styled from 'styled-components'

import Caption from './Caption'

class Image extends React.PureComponent {
    render() {
        let { alt, className } = this.props
        return (
            <div className={className}>
                <img {...this.props} className={null} />
                {alt && <Caption>{alt}</Caption>}
            </div>
        )
    }
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
