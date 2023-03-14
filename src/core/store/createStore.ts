import { IState } from '@core/models'
import { IStore } from './../models'
export function createStore(
  rootReducer: Function,
  initialState: IState
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
    getState() {
      return JSON.parse(JSON.stringify(state))
    },
  }
}

