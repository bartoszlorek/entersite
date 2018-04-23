import React from 'react'
import styled from 'styled-components'
import Stickyfill from 'stickyfilljs'
import createStickyflow from '../.utils/stickyflow'

import MenuGroup from '../components/MenuGroup'
import data from '../data/menu.json'

const Stickyflow = createStickyflow()

class MenuContainer extends React.PureComponent {
    componentDidMount() {
        const { container } = this.refs
        Stickyfill.add(container)
        Stickyflow.add(container)
    }

    componentWillUnmount() {
        const { container } = this.refs
        Stickyfill.removeOne(container)
        Stickyflow.removeOne(container)
    }

    render() {
        let { className } = this.props
        return (
            <div ref="container" className={className}>
                {data.map((group, index) => (
                    <MenuGroup
                        key={index}
                        title={group.title}
                        items={group.items}
                    />
                ))}
            </div>
        )
    }
}

export default styled(MenuContainer)`
    & {
        padding: 24px;
    }

    @media (min-width: 600px) {
        & {
            position: -webkit-sticky;
            position: sticky;
            padding: 6vw;
            top: 0;
        }
    }
`
