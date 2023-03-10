import { Router } from '@core/routes/Router'
import { DashboardPage, ExcelPage } from '@pages'

import './scss/index.scss'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})