import { ACTION } from './types'

export interface IData {
  type: ACTION
  data: any
}

export function changeTitle(data: object): IData {
  return {
    type: ACTION.CHANGE_TITLE,
    data,
  }
}

export function tableResize(data: object): IData {
  return {
    type: ACTION.TABLE_RESIZE,
    data,
  }
}

export function changeText(data: object): IData {
  return {
    type: ACTION.CHANGE_TEXT,
    data,
  }
}

export function changeStyles(data: object): IData {
  return {
    type: ACTION.CHANGE_STYLES,
    data,
  }
}

export function applyStyle(data: object): IData {
  return {
    type: ACTION.APPLY_STYLE,
    data,
  }
}
