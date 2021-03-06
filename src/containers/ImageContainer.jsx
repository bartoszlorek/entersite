import React from 'react'
import styled from 'styled-components'

import { BASE } from '../../config'
import Image from '../components/Image'
import data from '../data/images.json'

const transformedData = data.map(img => ({
    src: `${BASE}images/${img.filename}`,
    width: img.width,
    height: img.height,
    alt: img.alt || '',
    caption: img.caption || ''
}))

class ImageContainer extends React.Component {
    render() {
        let { className } = this.props
        return (
            <div ref="container" className={className}>
                {transformedData.map((item, index) => (
                    <Image key={index} {...item} />
                ))}
            </div>
        )
    }
}

export default styled(ImageContainer)`
    display: none;

    @media (min-width: 600px) {
        & {
            display: block;
            padding: 6vw;
        }
        ${Image}:last-child {
            margin: 0;
        }
    }
`
