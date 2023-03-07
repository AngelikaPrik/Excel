import { Excel, Formula, Header, Table, Toolbar } from '@components'
import { createStore } from '@core/store/createStore'
import { Page } from '@core/Page'
import { debounce, storage } from '@core/utils'
import { normilizeInitialState } from '@redux/inititalState'
import { rootReducer } from '@redux/rootReducer'
import { IModelState } from '@core/models'

const storageName = (param: string): string => `excel:${param}`

export class ExcelPage extends Page {
  excel: Excel
  storeSub: {[key:string]: Function}

  constructor(...params: ConstructorParameters<typeof Page>) {
    super(...params)
    this.storeSub = null
  }

  getRoot() {
    const params = this.params || Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normilizeInitialState(state))

    const stateListener = debounce((state: IModelState) => {
      storage(storageName(params), state)
    }, 500)

    this.storeSub = store.subscribe(stateListener)

    this.excel = new Excel({
      excelComponentClasses: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}