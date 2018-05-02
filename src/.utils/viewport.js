const EVENT_NAMES = ['scroll', 'resize', 'orientationchange']

const attachListeners = fn => {
    EVENT_NAMES.forEach(name => {
        window.addEventListener(name, fn)
    })
}

const detachListeners = fn => {
    EVENT_NAMES.forEach(name => {
        window.removeEventListener(name, fn)
    })
}

const getViewSize = () => ({
    width: (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth || 0
    ),
    height: (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight || 0
    )
})

function createViewport() {
    const callbacks = []

    const calc = () => {
        const length = callbacks.length
        const { width, height } = getViewSize()

        if (width === api.width && height === api.height) {
            return api
        }
        api.width = width
        api.height = height

        if (length) {
            let index = -1
            while (++index < length) {
                callbacks[index].call(null, {
                    width,
                    height
                })
            }
        }
        return api
    }

    const api = Object.create({
        attach: () => {
            attachListeners(calc)
            return api
        },
        detach: () => {
            detachListeners(calc)
            return api
        },
        bind: fn => {
            if (typeof fn === 'function') {
                callbacks.push(fn)
            }
            return api
        },
        calc
    })

    return api.attach().calc()
}

export default createViewport
