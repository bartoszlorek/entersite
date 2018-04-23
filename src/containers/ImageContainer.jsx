import React from 'react'
import styled from 'styled-components'

import Image from '../components/Image'
import data from '../data/images.json'

class ImageContainer extends React.Component {
    render() {
        let { className } = this.props
        return (
            <div className={className}>
                {data.map((item, index) => <Image key={index} {...item} />)}
            </div>
        )
    }
}

export default styled(ImageContainer)`
    & {
        display: none;
    }

    @media (min-width: 600px) {
        & {
            display: block;
            padding: 6vw;
        }
        & img {
            display: block;
            margin: 0 0 3vw;
        }
        & img:last-child {
            margin: 0;
        }
    }
`
