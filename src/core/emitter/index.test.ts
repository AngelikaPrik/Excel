import { Emitter } from '.'

describe('Emmiter: ', () => {
  let emitter: Emitter

  beforeEach(() => {
    emitter = new Emitter()
  })

  test('should be defined', () => {
    expect(emitter).toBeDefined()
    expect(emitter).not.toBeUndefined()
  })
})
