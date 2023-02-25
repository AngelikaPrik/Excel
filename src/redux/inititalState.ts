import { defaultTitle, IStyles } from './../constants'
import { defaultStyles } from '../constants'
import { storage } from '../core/utils'

export interface IModelState {
  rowState: object
  colState: object
  dataState: object
  stylesState: object
  currentStyles: IStyles
  currentText: string
  title: string
}

const defaultState: IModelState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  title: defaultTitle,
}

const normilize = (state: IModelState): IModelState => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export const initialState: IModelState = storage('excel-state')
  ? normilize(storage('excel-state'))
  : defaultState
