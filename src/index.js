import './scss/index.scss'

import { Exel } from './components/exel'
import { Header } from './components/header'
import { Toolbar } from './components/toolbar'
import { Formula } from './components/formula'
import { Table } from './components/table'

const exel = new Exel('#app', {
  components: [Header, Toolbar, Formula, Table],
})

exel.render()
