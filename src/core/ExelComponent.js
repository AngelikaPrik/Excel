import { DomListener } from './DomListener'

export class ExelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ""

    this.prepare()
  }

  prepare(){
    
  }
  toHTML() {
    return ''
  }
  init() {
    this.addDomListeners()
  }
  destroy() {
    this.removeDomListeners()
  }
}
