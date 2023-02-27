import './scss/index.scss'

import { Excel } from './components/excel'

import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'
import { debounce, storage } from './core/utils'
import { IModelState, initialState } from './redux/inititalState'
import { Header } from './components/header'
import { Toolbar } from './components/toolbar'
import { Formula } from './components/formula'
import { Table } from './components/table'

const store = createStore(rootReducer, initialState)

const stateListener = debounce((state: IModelState) => {
  storage('excel-state', state)
}, 500)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
