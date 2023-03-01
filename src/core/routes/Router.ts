import { $, Dom } from '@core/dom'
import { Page } from '@core/Page'
import { ActiveRoute } from './ActiveRoute'

export class Router {
  $placeholder: Dom
  routes: any
  page: Page

  constructor(selector: string, routes: IRoutesModel) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }
    this.$placeholder = $(selector)
    this.page = null
    this.routes = routes
    this.changePageHandler = this.changePageHandler.bind(this)
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard

    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())

    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}

interface IRoutesModel {
  dashboard: InstanceType<typeof Page>
  excel: InstanceType<typeof Page>
}
