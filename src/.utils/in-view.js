const EVENT_NAMES = ['load', 'scroll', 'resize', 'orientationchange']

const getViewSize = () => ({
    width: (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    ),
    height: (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    )
})

const applySize = (bounds, size) => ({
    top: bounds.top * size.height,
    bottom: bounds.bottom * size.height,
    left: bounds.left * size.width,
    right: bounds.right * size.width
})

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
    top: 0,
    bottom: 1,
    left: 0,
    right: 1
}

function createInView(bounds = {}) {
    bounds = Object.assign({}, defaults, bounds)

    let elements = [],
        callback = null

    const calc = () => {
        if (callback === null) {
            return
        }
        let result = [],
            index = -1

        const length = elements.length
        const sizing = applySize(bounds, getViewSize())

        while (++index < length) {
            let elem = elements[index],
                rect = elem.getBoundingClientRect()

            if (rect.top <= sizing.bottom &&
                rect.bottom > sizing.top &&
                rect.left <= sizing.right &&
                rect.right > sizing.left
            ) {
                result.push(elem)
            }
        }

        callback(result)
    }

    const attachListeners = () => {
        EVENT_NAMES.forEach(name => {
            window.addEventListener(name, calc)
        })
    }

    const detachListeners = () => {
        EVENT_NAMES.forEach(name => {
            window.removeEventListener(name, calc)
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

        onChange: fn => {
            callback = typeof fn === 'function' ? fn : null
            return self
        }
    }

    return self
}

export default createInView
