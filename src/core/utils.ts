import { IStyles } from './models' 
import { IModelState } from './models'

export function capitalize(str: string): string {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function range(start: number, end: number): number[] {
  if (start > end) [end, start] = [start, end]
  return new Array(end - start + 1).fill('').map((_, i) => start + i)
}

export function storage(
  key: string,
  data: IModelState = null
): IModelState | never {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(
  a: string | number | object,
  b: string | number | object
): boolean {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function toKebabCase(str: string): string {
  if (typeof str !== 'string') {
    return
  }
  return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
}

export function toInlineStyles(styles: IStyles = {}) {
  return Object.keys(styles)
    .map(key => `${toKebabCase(key)}: ${styles[key as keyof IStyles]}`)
    .join(';  ')
}

export function debounce(fn: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: any[]) {
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
