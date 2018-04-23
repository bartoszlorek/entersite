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

function createStickyflow(view = window, factor = 0.33) {
    let prevOffset = 0,
        viewHeight = 0,
        viewTop = 0,
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
            if (node == null) {
                return self
            }
            let length = elements.length
            if (node.length !== undefined) {
                node = Array.prototype.slice.call(node)
                if (!node.length) {
                    return self
                }
                elements = elements.concat(node)
            } else {
                elements.push(node)
            }
            if (!length) {
                attachListeners()
            }
            return self
        },

        removeOne: node => {
            elements = elements.filter(e => e !== node)
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
