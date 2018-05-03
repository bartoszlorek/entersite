// Browser compatibility
// IE9+, Firefox, Chrome, Safari, Opera

const EVENT_SCHEMA_KEYS = ['target', 'types', 'args']

const EVENT_SCHEMA = {
    ready: {
        target: document,
        types: ['DOMContentLoaded']
    },
    load: {
        target: window,
        types: ['load']
    },
    unload: {
        target: window,
        types: ['beforeunload']
    },
    resize: {
        target: window,
        types: ['resize', 'scroll', 'orientationchange'],
        args: ['width', 'height']
    },
    scroll: {
        target: window,
        types: ['scroll'],
        args: ['scrollX', 'scrollY']
    }
}

const EVENT_ARG_METHODS = {
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

function addEventListener(elem, event, fn) {
    if (elem == null) {
        return
    }
    if (elem.addEventListener) {
        elem.addEventListener(event, fn, false)
    } else {
        elem.attachEvent('on' + event, () => {
            return fn.call(elem, window.event)
        })
    }
}

function removeEventListener(elem, event, fn) {
    if (elem == null) {
        return
    }
    if (elem.removeEventListener) {
        elem.removeEventListener(event, fn)
    } else {
        elem.detachEvent('on' + event, fn)
    }
}

function createExecArgs(args, methods) {
    if (args != null && args.length) {
        return () => args.map(a => methods[a]())
    }
    return () => null
}

function createEvents(schema, methods) {
    const result = {}

    Object.keys(schema).forEach(name => {
        let cachedValues = []
        const { target, types, args } = schema[name]
        const execArgs = createExecArgs(args, methods)

        const self = {
            target,
            types,
            subscribers: [],
            publisher: forceUpdate => {
                const length = self.subscribers.length
                const values = execArgs()
    
                if (forceUpdate !== true && values !== null) {
                    let shouldUpdate = values.some((value, index) => {
                        return cachedValues[index] !== value
                    })
                    cachedValues = values
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

function normalizeSchema(schema, options) {
    if (options == null) {
        return schema
    }
    const result = {}

    Object.keys(schema).forEach(name => {
        const event = schema[name]
        const option = options[name]
        const buffer = (result[name] = {})

        EVENT_SCHEMA_KEYS.forEach(key => {
            buffer[key] = (option && option[key]) || event[key] || null
        })
    })
    return result
}

function createViewport(options) {
    const schema = normalizeSchema(EVENT_SCHEMA, options)
    const events = createEvents(schema, EVENT_ARG_METHODS)
    const eventNames = Object.keys(events)

    const addEventPublisher = ({ target, types, publisher }) => {
        types.forEach(type => addEventListener(target, type, publisher))
    }

    const removeEventPublisher = ({ target, types, publisher }) => {
        types.forEach(type => removeEventListener(target, type, publisher))
    }

    const addEventSubscriber = (event, fn) => {
        event.subscribers.push(fn)
        if (event.subscribers.length === 1) {
            addEventPublisher(event)
        }
    }

    const removeEventSubscriber = (event, fn) => {
        let index = event.subscribers.indexOf(fn)
        if (index > -1) {
            event.subscribers.splice(index, 1)
            if (!event.subscribers.length) {
                removeEventPublisher(event)
            }
        }
    }

    const removeAllEventSubscribers = event => {
        event.subscribers = []
        removeEventPublisher(event)
    }

    const getValidEvent = name => {
        if (events[name] === undefined) {
            throw new Error(`The '${name}' is not a valid event name.`)
        }
        return events[name]
    }

    const api = {
        on: (name, fn) => {
            let event = getValidEvent(name)
            if (typeof fn === 'function') {
                addEventSubscriber(event, fn)
            }
            return api
        },

        off: (name, fn) => {
            if (name === undefined) {
                eventNames.forEach(name => {
                    removeAllEventSubscribers(events[name])
                })
            } else {
                let event = getValidEvent(name)
                if (typeof fn === 'function') {
                    removeEventSubscriber(event, fn)
                } else if (fn === undefined) {
                    removeAllEventSubscribers(event)
                }
            }
            return api
        },

        trigger: name => {
            getValidEvent(name).publisher(true)
            return api
        }
    }

    // add static methods to the API
    Object.keys(EVENT_ARG_METHODS).forEach(name => {
        api[name] = EVENT_ARG_METHODS[name]
    })

    return api
}

export default createViewport
