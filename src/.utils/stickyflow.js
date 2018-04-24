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
    let lastPageOffset = 0,
        elements = []

    const calc = () => {
        let index = -1
        const length = elements.length
        const offset = (view.pageYOffset - lastPageOffset) * factor
        const viewHeight = getViewHeight()

        lastPageOffset = view.pageYOffset

        while (++index < length) {
            let elem = elements[index],
                height = getHeight(elem)

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
        }
    }

    return self
}

export default createStickyflow
