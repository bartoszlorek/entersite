import createViewport from '../src/.utils/viewport'

const noop = () => {}
const dispatchEvent = (name, target = 'window') => {
    global[target].dispatchEvent(new Event(name))
}

describe('init and options', () => {
    it('should return api object', () => {
        const view = createViewport()

        expect(view).toBeInstanceOf(Object)
        expect(view).toEqual(
            expect.objectContaining({
                on: expect.any(Function),
                off: expect.any(Function),
                trigger: expect.any(Function),
                width: expect.any(Function),
                height: expect.any(Function),
                scrollX: expect.any(Function),
                scrollY: expect.any(Function)
            })
        )
    })

    it('should change event type', () => {
        const view = createViewport({
            load: {
                type: ['unload']
            }
        })
        const callback = jest.fn()
        view.on('load', callback)

        dispatchEvent('load')
        dispatchEvent('unload')
        expect(callback.mock.calls.length).toBe(1)
    })

    it('should change event args', () => {
        const view = createViewport({
            load: {
                args: ['width', 'height']
            }
        })
        const callback = jest.fn()
        view.on('load', callback)

        global.window.innerWidth = 800
        global.window.innerHeight = 600
        dispatchEvent('load')
        expect(callback.mock.calls.length).toBe(1)
        expect(callback).lastCalledWith(800, 600)
    })
})

describe('handle error', () => {
    it('should throw error', () => {
        const view = createViewport()

        expect(() => view.on('resizes', noop)).toThrow()
        expect(() => view.off('resizes', noop)).toThrow()
        expect(() => view.trigger('resizes')).toThrow()
    })
})

describe('add event subscriber', () => {
    it('ready', () => {
        const view = createViewport()
        const callback = jest.fn()
        view.on('ready', callback)

        dispatchEvent('DOMContentLoaded', 'document')
        expect(callback.mock.calls.length).toBe(1)
    })

    it('load', () => {
        const view = createViewport()
        const callback = jest.fn()
        view.on('load', callback)

        dispatchEvent('load')
        expect(callback.mock.calls.length).toBe(1)
    })

    it('unload', () => {
        const view = createViewport()
        const callback = jest.fn()
        view.on('unload', callback)

        dispatchEvent('beforeunload')
        expect(callback.mock.calls.length).toBe(1)
    })

    it('resize (desktop prevents overcalling)', () => {
        const win = global.window
        const view = createViewport()
        const callback = jest.fn()
        view.on('resize', callback)

        win.innerWidth = 800
        win.innerHeight = 600
        dispatchEvent('resize')
        dispatchEvent('scroll')
        dispatchEvent('resize')

        expect(callback.mock.calls.length).toBe(1)
        expect(callback).lastCalledWith(800, 600)
    })

    it('resize (scrolling mobile changes size)', () => {
        const win = global.window
        const view = createViewport()
        const callback = jest.fn()
        view.on('resize', callback)

        win.innerWidth = 800
        win.innerHeight = 600
        dispatchEvent('resize')
        win.innerHeight = 605
        dispatchEvent('scroll')
        win.innerHeight = 610
        dispatchEvent('orientationchange')

        expect(callback.mock.calls.length).toBe(3)
        expect(callback).lastCalledWith(800, 610)
    })

    it('scroll', () => {
        const view = createViewport()
        const callback = jest.fn()
        view.on('scroll', callback)

        global.window.pageYOffset = 50
        dispatchEvent('scroll')

        expect(callback.mock.calls.length).toBe(1)
        expect(callback).lastCalledWith(0, 50)
    })
})

describe('remove event subscribers', () => {
    it('remove given subscriber', () => {
        const view = createViewport()
        const first = jest.fn()
        const second = jest.fn()
        view
            .on('load', first)
            .on('load', second)
            .off('load', first)

        dispatchEvent('load')
        expect(first.mock.calls.length).toBe(0)
        expect(second.mock.calls.length).toBe(1)
    })

    it('remove all subscribers', () => {
        const view = createViewport()
        const first = jest.fn()
        const second = jest.fn()
        view
            .on('load', first)
            .on('load', second)
            .off('load')

        dispatchEvent('load')
        expect(first.mock.calls.length).toBe(0)
        expect(second.mock.calls.length).toBe(0)
    })
})

describe('trigger event publisher', () => {
    it('call given event', () => {
        const view = createViewport()
        const callback = jest.fn()
        view.on('load', callback).trigger('load')

        expect(callback.mock.calls.length).toBe(1)
    })
})

describe('static methods', () => {
    const view = createViewport()

    it('width', () => {
        global.window.innerWidth = 950
        expect(view.width()).toBe(950)
    })

    it('height', () => {
        global.window.innerHeight = 450
        expect(view.height()).toBe(450)
    })

    it('scrollX', () => {
        global.window.pageXOffset = 100
        expect(view.scrollX()).toBe(100)
    })

    it('scrollY', () => {
        global.window.pageYOffset = 200
        expect(view.scrollY()).toBe(200)
    })
})
