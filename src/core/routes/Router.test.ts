import { Page } from '../Page'
import { Router } from './Router'

class DashboardPage extends Page {
  override getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
class ExcelPage extends Page {}

let router: Router
let $root: HTMLElement

describe('Router:', () => {

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard Page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})

describe('Router: init', () => {

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    })
  })

  test('should be defined', () => {
    expect(router.init).toBeDefined()
  });
});