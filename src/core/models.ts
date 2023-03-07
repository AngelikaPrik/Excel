import { ACTION } from '@redux/types'
import { Page } from './Page'

export interface IStore {
  subscribe: (fn: Function) => { unsubscribe: Function }
  dispatch: (action: IData) => void
  getState: () => IModelState
}

export interface IModelState {
  rowState: object
  colState: object
  dataState: { [key: string]: string }
  stylesState: { [key: string]: { [key: string]: string } }
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
  dashboard: any
  excel: any
}
