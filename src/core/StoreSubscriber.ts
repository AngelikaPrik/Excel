import { IStore } from './createStore'
import { IModelState } from './../redux/inititalState'
import { ExcelComponent } from './ExcelComponent'
import { isEqual } from './utils'

export class StoreSubscriber {
  prevState: IModelState | {}
  store: IStore
  sub: any

  constructor(store: IStore) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components: ExcelComponent[]) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe((state: IModelState) => {
      Object.keys(state).forEach(key => {
        if (
          !isEqual(
            this.prevState[key as keyof typeof this.prevState],
            state[key as KeyState]
          )
        ) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = { [key]: state[key as KeyState] }
              component.storeChanged(changes)
            }
          })
        }
      })
      this.prevState = this.store.getState()
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}

type KeyState = keyof IModelState
