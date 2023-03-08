import { IStyles } from './models'

export class Dom {
  $el: any
  constructor(selector: HTMLElement | EventTarget | string) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(html: string) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  text(text?: string) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
  clear() {
    this.html('')
    return this
  }
  on(eventType: string, callback: Function): void {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType: string, callback: Function) {
    this.$el.removeEventListener(eventType, callback)
  }
  append(node: Dom | HTMLElement) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if ((Element.prototype as HTMLElement).append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  get data() {
    return this.$el.dataset
  }
  closest(selector: string) {
    return $(this.$el.closest(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  findAll(selector: string) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector: string): Dom {
    return $(this.$el.querySelector(selector))
  }
  css(styles: { [key: string]: string | number } = {}) {
    Object.keys(styles).forEach(key => (this.$el.style[key] = styles[key]))
  }
  getStyles(styles: string[]) {
    return styles.reduce((res: IStyles, s) => {
      res[s as keyof typeof res] = this.$el.style[s]
      return res
    }, {})
  }
  addClass(className: string) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className: string) {
    this.$el.classList.remove(className)
    return this
  }
  id(parse?: boolean) {
    if (typeof parse === 'boolean' && parse) {
      const parsed: string[] = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1],
      }
    } else if (typeof parse === 'undefined') {
      return this.data.id
    }
  }
  attr(name: string, value: string) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }

  focus() {
    this.$el.focus()
    return this
  }
}

export function $(selector: string | HTMLElement | EventTarget): Dom {
  return new Dom(selector)
}

$.create = (tagName: string, classes: string = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
