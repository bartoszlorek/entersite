import { css } from 'styled-components'

export default css`
    html {
        font-family: 'Fira Mono', monospace;
        font-size: 16px;
    }

    body {
        color: #222;
        margin: 0;
    }

    a,
    a:visited,
    a:focus,
    a:active,
    a:hover {
        color: #222;
        text-decoration: none;
        position: relative;
        -webkit-tap-highlight-color: rgba(148, 204, 51, 0.5);
        outline: 0;
    }

    .no-touchevents {
        a.active:before,
        a:focus:before,
        a:hover:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            height: 0.75em;
            right: 0;
            background: #c2e08e;
            opacity: 1;
            z-index: -1;
        }
    }

    img {
        width: 100%;
        height: auto;
    }
`
