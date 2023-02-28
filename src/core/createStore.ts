import { IData } from '@redux/actions'
import { IModelState } from '@redux/inititalState'

export interface IStore {
  subscribe: (fn: Function) => { unsubscribe: Function }
  dispatch: (action: IData) => void
  getState: () => IModelState
}

export function createStore(
  rootReducer: Function,
  initialState: IModelState
): IStore {
  let state = rootReducer({ ...initialState }, { type: 'INIT' })
  let listeners: Function[] = []

  return {
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn)
        },
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    getState(): IModelState {
      return JSON.parse(JSON.stringify(state))
    },
  }
}
