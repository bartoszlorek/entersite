import React from 'react'
import styled from 'styled-components'

import Link from './Link'

const Title = styled.h3`
    font-weight: 500;
    margin: 0 0 12px;
`

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

const ListItem = styled.li`
    & ${Link} {
        display: inline-block;
        padding: 0.25em 0;
    }
`

class MenuGroup extends React.PureComponent {
    render() {
        let { className, title, items } = this.props
        return (
            <div className={className}>
                <Title>{title}</Title>
                <List>
                    {items.map((item, index) => (
                        <ListItem key={index}>
                            <Link href={item.url}>{item.name}</Link>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

export default styled(MenuGroup)`
    margin: 0 0 36px;

    &:last-child {
        margin: 0;
    }
`
