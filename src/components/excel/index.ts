import { StoreSubscriber } from '@core/StoreSubscriber'
import { Emitter } from '@core/emitter'
import { $ } from '@core/dom'
import { updateDate } from '@redux/actions'
import { preventDefault } from '@core/utils'
import { ExcelComponent } from '@core/ExcelComponent'
import { IStore } from '@core/models'

export class Excel {
  private excelInstances: ExcelComponent[] = []
  private excelClasses: Array<typeof ExcelComponent>
  private store: IStore
  private emitter: Emitter = new Emitter()
  private subscriber: StoreSubscriber

  constructor(public options: IOptions) {
    this.excelClasses = options.excelClasses || []
    this.store = options.store
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }

    this.excelInstances = this.excelClasses.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)

      return component
    })

    return $root
  }

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault)
    }

    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.excelInstances)
    this.excelInstances.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.excelInstances.forEach(component => component.destroy())
    document.removeEventListener('contextmenu', preventDefault)
  }
}

interface IOptions {
  excelClasses: Array<typeof ExcelComponent>
  store: IStore
}
