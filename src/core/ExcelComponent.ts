import { IData } from './models'
import { IStore } from './models'
import { Emitter } from './emitter'
import { Dom } from './dom'
import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
  override readonly name: string
  protected emitter: Emitter
  private subscribe: string[]
  protected store: IStore
  private unsubscribers: Function[]
  static className = ''

  constructor($root: Dom, options: Record<string, any> = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  prepare() {}

  $emit(event: string, ...args: any[]) {
    this.emitter.emit(event, ...args)
  }

  $on(event: string, fn: Function) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action: IData) {
    this.store.dispatch(action)
  }

  toHTML() {
    return ''
  }

  storeChanged(_changes: any) {}

  isWatching(key: string) {
    return this.subscribe.includes(key)
  }

  init() {
    this.addDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
