import React from 'react'
import styled from 'styled-components'

import MenuGroup from '../components/MenuGroup'
import data from '../data/menu.json'

class MenuContainer extends React.PureComponent {
    render() {
        let { className } = this.props
        return (
            <div className={className}>
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
    @media (min-width: 600px) {
        & {
            position: -webkit-sticky;
            position: sticky;
            padding: 6vw;
            top: 0;
        }
    }
`
