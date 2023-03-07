import { IModelState } from '../models'
import {
  capitalize,
  range,
  storage,
  isEqual,
  toKebabCase,
  toInlineStyles,
  debounce,
  clone,
  preventDefault,
} from './index'

jest.useFakeTimers()

describe('capitalize: ', () => {
  test('should be defined', () => {
    expect(capitalize).toBeDefined()
  })

  test('should return string with the first capital letter', () => {
    expect(capitalize('word')).toBe('Word')
    expect(capitalize('word')).not.toBe('word')
  })

  test('should return empty string if argument is not a string', () => {
    //  @ts-ignore
    expect(capitalize(123)).toBe('')
    //  @ts-ignore
    expect(capitalize(null)).toBe('')
    //  @ts-ignore
    expect(capitalize(undefined)).toBe('')
    //  @ts-ignore
    expect(capitalize([])).toBe('')
    //  @ts-ignore
    expect(capitalize({})).toBe('')
  })
})

describe('range: ', () => {
  test('should to be defined', () => {
    expect(range).toBeDefined()
  })

  test('should return array of numbers', () => {
    expect(range(0, 1)).toEqual([0, 1])
    expect(Array.isArray(range(0, 1))).toBeTruthy()
    expect(range(0, 1)).not.toContain(String)
    expect(range(0, 1)).not.toContain(false)
    expect(range(0, 1)).not.toContain(undefined)
    expect(range(0, 1)).not.toContain(Object)
  })

  test('should return an array of numbers in descending order if start is greater than end', () => {
    expect(range(5, 1)).toEqual([1, 2, 3, 4, 5])
  })

  test('should throw an error if arguments is not numbers', () => {
    // @ts-ignore
    expect(() => range('not a number', '2')).toThrow(TypeError)

    // @ts-ignore
    expect(() => range(0, '2')).toThrow(TypeError)
  })
})

describe('storage: ', () => {
  let result: IModelState
  const data: IModelState = {
    rowState: {},
    colState: {},
    dataState: { '0': '2' },
    stylesState: { fontWeight: { '0': 'bold' } },
    currentStyles: {},
    currentText: '',
    title: '',
    openingDate: '12.02.2023',
  }
  const key = 'testKey'

  beforeEach(() => {
    storage(key, data)
    result = storage(key)
  })

  test('should be defined', () => {
    expect(storage).toBeDefined()
  })

  test('should throw an error if first argument is undefined', () => {
    // @ts-ignore
    expect(() => storage()).toThrowError()
  })

  test('should return IModelState', () => {
    expect(result).toMatchObject<IModelState>(data)
  })
})

describe('isEqual: ', () => {
  test('should be defined', () => {
    expect(isEqual).toBeDefined()
  })

  test('should return a boolean value', () => {
    const result = isEqual(1, 1)
    const resultWithObj = isEqual({ a: 1, b: 1 }, { a: 1, b: 1 })

    expect(result).toBeTruthy()
    expect(resultWithObj).toBeTruthy()
    expect(isEqual(0, 1)).toBeFalsy()
    expect(typeof result).not.toBe('string')
    expect(typeof resultWithObj).not.toBe('string')
    expect(typeof result).not.toBe('number')
    expect(typeof resultWithObj).not.toBe('number')
    expect(typeof result).toBe('boolean')
    expect(typeof resultWithObj).toBe('boolean')
  })

  test('should throw error if argument is not defined', () => {
    // @ts-ignore
    expect(() => isEqual(1)).toThrowError()
  })
})

describe('toKebabCase: ', () => {
  test('should be defined', () => {
    expect(toKebabCase).toBeDefined()
  })

  test('should return sentence in kebab case', () => {
    expect(toKebabCase('wordWordWord')).toBe('word-word-word')
    expect(toKebabCase('wordWordWord')).not.toBe('wordwordword')
    expect(toKebabCase('wordWordWord')).not.toBe('WordWordWord')
  })

  test('should accept parametres in camelcase', () => {
    expect(toKebabCase('wordword')).not.toBe('word-word')
    expect(toKebabCase('wordword')).toBe('wordword')
  })

  test('should return if argument is not a string', () => {
    //  @ts-ignore
    expect(toKebabCase(123)).toBe()
  })
})

describe('toInlineStyles', () => {
  test('should be defined', () => {
    expect(toInlineStyles).toBeDefined()
  })

  test('should return a string', () => {
    expect(typeof toInlineStyles({ fontWeight: 'bold' })).toBe('string')
    expect(toInlineStyles({ fontWeight: 'bold' })).toBe('font-weight: bold')
    expect(toInlineStyles({ fontWeight: 'bold', fontStyle: 'italic' })).toBe(
      'font-weight: bold; font-style: italic'
    )
  })

  test('should return an empty string if in arguments empty object', () => {
    expect(toInlineStyles()).toBe('')
  })
})

describe('debounce: ', () => {
  let mockFn: jest.Mock
  let debouncedFunc: Function

  beforeEach(() => {
    mockFn = jest.fn()
    debouncedFunc = debounce(mockFn, 200)
  })

  test('should debounce a function call', () => {
    debouncedFunc()
    expect(mockFn).not.toBeCalled()

    jest.advanceTimersByTime(200)
    expect(mockFn).toBeCalledTimes(1)
  })

  test('should pass arguments to the debounced function', () => {
    debouncedFunc(1, 'hello', { name: 'John' })
    jest.advanceTimersByTime(200)
    expect(mockFn).toBeCalledWith(1, 'hello', { name: 'John' })
  })

  test('execute just once', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc()
    }

    jest.runAllTimers()

    expect(mockFn).toBeCalledTimes(1)
  })
})

describe('clone: ', () => {
  test('should be defined', () => {
    expect(clone).toBeDefined()
  })

  test('should create a shallow copy of the object', () => {
    const obj = { a: 1, b: 'test' }
    const copy = clone(obj)
    expect(copy).toEqual(obj)
    expect(copy).not.toBe(obj)
  })

  test('should create a deep copy of the object', () => {
    const deepObj = { a: { b: 'c' } }
    const copy = clone(deepObj)

    expect(copy).toEqual(deepObj)
    expect(copy.a).not.toBe(deepObj.a)
  })
})

describe('preventDefault: ', () => {
  const event = {
    preventDefault: jest.fn(),
  }
  test('should prevent a default action of the event', () => {
    preventDefault(event as unknown as Event)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
  })
})
