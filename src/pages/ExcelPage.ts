import { DashboardPage } from '@pages/DashboardPage';
import { Excel, Formula, Header, Table, Toolbar } from '@components'
import { createStore } from '@core/createStore'
import { Page } from '@core/Page'
import { debounce, storage } from '@core/utils'
import { IModelState, normilizeInitialState } from '@redux/inititalState'
import { rootReducer } from '@redux/rootReducer'

const storageName = (param: string): string => `excel:${param}`

export class ExcelPage extends Page {
  excel: Excel

  constructor(...params: ConstructorParameters<typeof Page>) {
    super(...params)
  }

  getRoot() {
    const params = this.params || Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normilizeInitialState(state))

    const stateListener = debounce((state: IModelState) => {
      storage(storageName(params), state)
    }, 500)

    store.subscribe(stateListener)

    this.excel = new Excel({
      componentsClass: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
