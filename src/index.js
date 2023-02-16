import './scss/index.scss'

import { Excel } from './components/excel'
import { Header } from './components/header'
import { Toolbar } from './components/toolbar'
import { Formula } from './components/formula'
import { Table } from './components/table'
import { createStore } from './core/createStore'
import { rootReducer } from './redux/rootReducer'

const store = createStore(rootReducer, {
  colState: {},

})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
