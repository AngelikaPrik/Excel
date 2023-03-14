import { ACTION } from '@redux/types'
import { Page } from './Page'

export interface IStore {
  subscribe: (fn: Function) => { unsubscribe: Function }
  dispatch: (action: IData) => void
  getState: () => IState
}

export interface IState {
  rowState: Record<string, number>
  colState: Record<string, number>
  dataState: Record<string, string>
  stylesState: Record<string, Record<string, string>>
  currentStyles: IStyles
  currentText: string
  title: string
  openingDate: string
}

export interface IData {
  type: ACTION
  data: any
}

export interface IStyles {
  textAlign?: string
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
}

export interface IRoutesModel {
  [route: string]: typeof Page
}

export interface IDomListener {
  addDomListeners(): void
  removeDomListeners(): void
}

export interface IRouter {
  init(): void
  changePageHandler(): void
  destroy(): void
}

export type SelectorType = string | HTMLElement | EventTarget