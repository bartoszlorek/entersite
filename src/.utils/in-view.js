const EVENT_NAMES = ['scroll', 'resize', 'orientationchange']

const getViewHeight = () => {
    return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    )
}

const parseNode = node => {
    if (node == null) {
        return []
    }
    if (node.length !== undefined) {
        return Array.prototype.slice.call(node)
    }
    return [node]
}

const defaults = {
    container: null,
    top: 0,
    bottom: 1,
    left: 0,
    right: 1
}

function createInView(spec) {
    const options = Object.assign({}, defaults, spec)

    let elements = []

    const calc = () => {
        let index = -1
        const length = elements.length

        while (++index < length) {
            let elem = elements[index],
                rect = elem.getBoundingClientRect()
        }
    }

    const attachListeners = () => {
        EVENT_NAMES.forEach(name => {
            view.addEventListener(name, calc)
        })
    }

    const detachListeners = () => {
        EVENT_NAMES.forEach(name => {
            view.removeEventListener(name, calc)
        })
    }

    const self = {
        add: node => {
            let parsed = parseNode(node)
            if (parsed.length) {
                if (!elements.length) {
                    attachListeners()
                }
                elements = elements.concat(parsed)
            }
            return self
        },

        removeOne: node => {
            let parsed = parseNode(node)
            if (parsed.length) {
                elements = elements.filter(a => {
                    return parsed.indexOf(a) < 0
                })
                if (!elements.length) {
                    detachListeners()
                }
            }
            return self
        },

        removeAll: () => {
            elements = []
            detachListeners()
            return self
        },

        onChange: () => {}
    }

    return self
}

export default createInView
