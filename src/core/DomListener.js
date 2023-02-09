import { capitalize } from '@utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) throw new Error('No root provided for DomListener')
    this.$root = $root
    this.listeners = listeners
  }
  addDomListeners() {
    this.listeners.forEach((listener) => {
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
	console.log('removeDom')
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}