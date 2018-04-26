import React from 'react'
import styled from 'styled-components'
import createInView from '../.utils/in-view'

import { BASE } from '../../config'
import Image from '../components/Image'
import data from '../data/images.json'

const transformedData = data.map(img => ({
    src: `${BASE}images/${img.filename}`,
    'data-group': img.group,
    width: img.width,
    height: img.height
}))

const inView = createInView({
    top: 0.5,
    bottom: 0.5
})

class ImageContainer extends React.Component {
    componentDidMount() {
        const { container } = this.refs
        inView.add(container.children).onChange(this.props.onView)
    }

    componentWillUnmount() {
        inView.removeAll()
    }

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
