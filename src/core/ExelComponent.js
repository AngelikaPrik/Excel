import { DomListener } from './DomListener'

export class ExelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.prepare()
  }

  // настройка компонента до init
  prepare() {}

  // возврат шаблона компонента
  toHTML() {
    return ''
  }

  // уведомление слушателей о событиях
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписка на события
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // инициализация компонента и добавление слушателей
  init() {
    this.addDomListeners()
  }

  // удаление компонента и слушателей
  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
