const EVENT_NAMES = ['scroll', 'resize', 'orientationchange']

const getViewHeight = () => {
    return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    )
}

const getHeight = elem => {
    return elem.offsetHeight || elem.clientHeight || 0
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

function createStickyflow(view = window, factor = 0.33) {
    let prevOffset = 0,
        viewHeight = 0,
        elements = []

    const calc = () => {
        let offset = (view.pageYOffset - prevOffset) * factor
        prevOffset = view.pageYOffset
        viewHeight = getViewHeight()

        elements.forEach(elem => {
            let height = getHeight(elem)
            if (height < viewHeight) {
                elem.style.top = ''
                return
            }
            let margin = viewHeight - height,
                top = elem.getBoundingClientRect().top - offset

            if (top < 0) {
                if (top < margin) {
                    top = margin
                }
                elem.style.top = top + 'px'
            } else {
                elem.style.top = ''
            }
        })
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
            elements = elements.filter(a => a !== node)
            if (!elements.length) {
                detachListeners()
            }
            return self
        },

        removeAll: () => {
            elements = []
            detachListeners()
            return self
        }
    }

    calc()
    return self
}

export default createStickyflow
