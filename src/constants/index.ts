import { flattenDeep, range } from 'lodash-es'
import wubiXsjData from './wubiXsjRootList'

export const hType = 'gfdsa'
// 竖
export const sType = 'hjklm'
// 撇
export const pType = 'trewq'
// 捺
export const nType = 'yuiop'
// 折
export const zType = 'nbvcx'

export const WUBI_ROOT_TYPE = {
  h: hType,
  s: sType,
  p: pType,
  n: nType,
  z: zType,
}

export { wubiXsjData }

export const wubiXsjRootList = flattenDeep(Object.values(wubiXsjData).map((typeList) => {
  return typeList.map(([char, d]) => {
    return d.list.map((rootIdx) => {
      return {
        key: `${char}-${rootIdx}`,
        char,
        main: d.main,
      }
    })
  })
}))

export enum InputStatus {
  waiting = 'waiting',
  right = 'right',
  wrong = 'wrong',
  timeout = 'timeout',
}
