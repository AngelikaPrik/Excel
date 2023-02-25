import { IStyles } from './../constants'
import { ACTION } from './types'

export interface IData {
  type: ACTION
  data: ITableResize | IChangeText | IStyles | IApplyStyle | IChangeTitle
}

export interface ITableResize {
  id: string
  value: number
  resizeType: string
}

export interface IChangeText {
  id: string
  value: string
}

export interface IApplyStyle {
  ids: string[]
  value: IStyles
}

export interface IChangeTitle {
  value: string
}

export function changeTitle(data: IChangeTitle): IData {
  return {
    type: ACTION.CHANGE_TITLE,
    data,
  }
}

export function tableResize(data: ITableResize): IData {
  return {
    type: ACTION.TABLE_RESIZE,
    data,
  }
}

export function changeText(data: IChangeText): IData {
  return {
    type: ACTION.CHANGE_TEXT,
    data,
  }
}

export function changeStyles(data: IStyles): IData {
  return {
    type: ACTION.CHANGE_STYLES,
    data,
  }
}

export function applyStyle(data: IApplyStyle): IData {
  return {
    type: ACTION.APPLY_STYLE,
    data,
  }
}
