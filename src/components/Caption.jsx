import React from 'react'
import styled from 'styled-components'
import applyMarkdown from '../.utils/apply-markdown'

import Link from './Link'

const textColor = '#999'
const mark = applyMarkdown({
    '[]': (
        <Link
            color={textColor}
            defaultBackgroundColor={'#f2ea8c'}
            activeBackgroundColor={'#c2e08e'}
        />
    )
})

class Caption extends React.PureComponent {
    render() {
        return <span {...this.props}>{mark(this.props.children)}</span>
    }
}

export default styled(Caption)`
    font-style: italic;
    color: ${textColor};
`
