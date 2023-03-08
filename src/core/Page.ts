export class Page {
  readonly params: string

  constructor(params: string) {
    this.params = params
  }

  getRoot(): any {
    throw new Error('Method getRoot() is not implemented')
  }

  afterRender() {}

  destroy() {}
}
