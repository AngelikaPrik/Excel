import { IState, IStore } from '@core/models'
import { ExcelComponent } from './ExcelComponent'
import { isEqual } from './utils'

export class StoreSubscriber {
  private prevState: IState | {} = {}
  private store: IStore
  private sub!: Record<string, Function>

  constructor(store: IStore) {
    this.store = store
  }

  subscribeComponents(components: ExcelComponent[]) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe((state: IState) => {
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

type KeyState = keyof IState
