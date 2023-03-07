import { Emitter } from './index'

describe('Emmiter: ', () => {
  let emitter: Emitter
  let fn1: jest.Mock
  let fn2: jest.Mock

  beforeEach(() => {
    emitter = new Emitter()
    fn1 = jest.fn()
    fn2 = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should subscribe and emit events', () => {
    emitter.subscribe('event1', fn1)
    emitter.subscribe('event1', fn2)
    emitter.emit('event1')
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
  })

  test('should unsubscribe events', () => {
    const unsub = emitter.subscribe('event1', fn1)
    emitter.subscribe('event1', fn2)
    unsub()
    emitter.emit('event1')

    expect(fn1).toHaveBeenCalledTimes(0)
    expect(fn2).toHaveBeenCalledTimes(1)
  })
})
