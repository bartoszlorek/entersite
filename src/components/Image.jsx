import React from 'react'
import styled from 'styled-components'
import { transform } from '../.utils/react-utils'

class Image extends React.PureComponent {
    render() {
        let props = transform(this.props, {
            filename: 'src',
            group: 'data-group'
        })
        return <img {...props} src={`./images/${props.src}`} />
    }
}

export default Image
