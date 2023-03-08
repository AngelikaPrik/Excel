import { IModelState } from '@core/models'
import { IStyles } from '../models'

export function capitalize(str: string): string {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function range(start: number, end: number): number[] {
  if (typeof start !== 'number' || typeof end !== 'number') {
    throw new TypeError(`${start} || ${end} is not numbers`)
  }

  if (start > end) [end, start] = [start, end]
  return new Array(end - start + 1).fill('').map((_, i) => start + i)
}

export function storage(key: string, data?: IModelState): IModelState {
  if (!key) {
    throw new Error('Key is not defined')
  }
  if (!data) {
    const storedData = localStorage.getItem(key)
    return storedData && JSON.parse(storedData)
  }
  localStorage.setItem(key, JSON.stringify(data))
  return data
}

export function isEqual(
  a: string | number | object,
  b: string | number | object
): boolean {
  if (typeof a === 'undefined' || typeof b === 'undefined') {
    throw new Error('Arg is not defined')
  }
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function toKebabCase(str: string): string {
  if (typeof str !== 'string') {
    return ''
  }
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
}

export function toInlineStyles(styles: IStyles = {}) {
  return Object.keys(styles)
    .map(key => `${toKebabCase(key)}: ${styles[key as keyof IStyles]}`)
    .join('; ')
}

export function debounce(fn: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>

  return function (this: any, ...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function clone(obj: {}) {
  return JSON.parse(JSON.stringify(obj))
}

export function preventDefault(event: Event) {
  event.preventDefault()
}
