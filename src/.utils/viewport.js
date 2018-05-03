// Browser compatibility
// IE9+, Firefox, Chrome, Safari, Opera

const EVENT_SCHEMA = {
    onLoad: {
        type: ['load']
    },
    onUnload: {
        type: ['beforeunload']
    },
    onResize: {
        type: ['resize', 'scroll', 'orientationchange'],
        args: ['width', 'height']
    },
    onScroll: {
        type: ['scroll'],
        args: ['scrollX', 'scrollY']
    }
}

const EVENT_ARGS_METHODS = {
    width: () => (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    ),
    height: () => (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    ),
    scrollX: () => (
        window.scrollX || window.pageXOffset
    ),
    scrollY: () => (
        window.scrollY || window.pageYOffset
    )
}

const addEventListener = (event, fn) => {
    if (window.addEventListener) {
        window.addEventListener(event, fn, false)
    } else {
        window.attachEvent('on' + event, () => {
            return fn.call(window, window.event)
        })
    }
}

const removeEventListener = (event, fn) => {
    if (window.removeEventListener) {
        window.removeEventListener(event, fn)
    } else {
        window.detachEvent('on' + event, fn)
    }
}

function createEventHandlers(events, methods) {
    const result = {}

    Object.keys(events).forEach(name => {
        const { type, args } = events[name]
        let cachedArgs = []

        const self = {
            type,
            subscribers: [],
            publisher: force => {
                const length = self.subscribers.length
                const values = args ? args.map(a => methods[a].call()) : null
    
                if (force !== true && values !== null) {
                    let shouldUpdate = values.some((value, index) => {
                        return cachedArgs[index] !== value
                    })
                    cachedArgs = values
                    if (!shouldUpdate) {
                        return false
                    }
                }
                let index = -1
                while (++index < length) {
                    self.subscribers[index].apply(null, values)
                }
            }
        }
        result[name] = self
    })
    return result
}

const applyOptions = (events, options) => {
    if (options == null) {
        return events
    }
    const result = {}
    const apply = (key, event, option) => {
        return option && option[key] || event[key] 
    }
    Object.keys(events).forEach(name => {
        result[name] = {
            type: apply('type', events[name], options[name]),
            args: apply('args', events[name], options[name])
        }
    })
    return result
}

function createViewport(options) {
    const handlerNames = Object.keys(EVENT_SCHEMA)
    const handlers = createEventHandlers(
        applyOptions(EVENT_SCHEMA, options),
        EVENT_ARGS_METHODS
    )

    const addEventTypes = name => {
        let { type, publisher } = handlers[name]
        type.forEach(name => addEventListener(name, publisher))
    }
    const removeEventType = name => {
        let { type, publisher } = handlers[name]
        type.forEach(name => removeEventListener(name, publisher))
    }

    const api = Object.create({
        trigger: name => {
            if (handlers[name] !== undefined) {
                handlers[name].publisher(true)
            }
            return api
        },
        removeEvent: name => {
            if (api[name] !== undefined) {
                api[name].removeAll()
            }
            return api
        },
        removeAllEvents: () => {
            handlerNames.forEach(name => {
                api[name].removeAll()
            })
            return api
        }
    })

    // bind events to the API
    handlerNames.forEach(name => {
        const self = handlers[name]
        const event = fn => {
            if (typeof fn === 'function') {
                self.subscribers.push(fn)
                if (self.subscribers.length === 1) {
                    addEventTypes(name)
                }
            }
            return api
        }
        event.removeOne = fn => {
            if (typeof fn === 'function') {
                let index = self.subscribers.indexOf(fn)
                if (index > -1) {
                    self.subscribers.splice(index, 1)
                    if (!self.subscribers.length) {
                        removeEventType(name)
                    }
                }
            }
            return api
        }
        event.removeAll = () => {
            self.subscribers = []
            removeEventType(name)
            return api
        }
        event.trigger = () => {
            self.publisher(true)
            return api
        }

        api[name] = event
    })

    // bind methods to the API
    Object.keys(EVENT_ARGS_METHODS).forEach(name => {
        api[name] = EVENT_ARGS_METHODS[name]
    })

    return api
}

export default createViewport
