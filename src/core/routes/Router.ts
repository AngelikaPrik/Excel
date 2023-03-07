import { $, Dom } from '../dom'
import { IRoutesModel } from '../models'
import { Page } from '../Page'
import { ActiveRoute } from './ActiveRoute'

export class Router {
  $placeholder: Dom
  routes: IRoutesModel
  page: Page

  constructor(
    selector: HTMLElement | EventTarget | string,
    routes: IRoutesModel
  ) {
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
