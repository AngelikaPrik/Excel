import { Dom } from './dom'
import { IDomListener } from './models'
import { capitalize } from './utils'


export class DomListener implements IDomListener {
  [x: string]: any
  name:string = ''
  protected $root: Dom
  private listeners: string[]

  constructor($root: Dom, listeners = ['']) {
    if (!$root) throw new Error('No root provided for DomListener')
    this.$root = $root
    this.listeners = listeners
  }
  addDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name
        throw new Error(
          `Method: ${method} is not implemented in ${name} component`
        )
      }
      this.$root.on(listener, this[method].bind(this))
    })
  }
  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName: string): string {
  return 'on' + capitalize(eventName)
}