import { flattenDeep, range } from 'lodash-es'

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

export const wubiXsjData = {
  // 横
  h: [
    ['g', { list: range(0, 7), main: '王' }],
    ['f', { list: range(0, 8), main: '土' }],
    ['d', { list: range(0, 8), main: '大' }],
    ['s', { list: range(0, 4), main: '木' }],
    ['a', { list: range(0, 13), main: '工' }],
  ],
  // 竖
  s: [
    ['h', { list: range(0, 10), main: '目' }],
    ['j', { list: range(0, 8), main: '日' }],
    ['k', { list: range(0, 4), main: '口' }],
    ['l', { list: range(0, 11), main: '田' }],
    ['m', { list: range(0, 8), main: '山' }],
  ],
  // 撇
  p: [
    ['t', { list: range(0, 8), main: '禾' }],
    ['r', { list: range(0, 10), main: '白' }],
    ['e', { list: range(0, 14), main: '月' }],
    ['w', { list: range(0, 7), main: '人' }],
    ['q', { list: range(0, 13), main: '金' }],
  ],
  // 捺
  n: [
    ['y', { list: range(0, 8), main: '言' }],
    ['u', { list: range(0, 10), main: '立' }],
    ['i', { list: range(0, 12), main: '水' }],
    ['o', { list: range(0, 9), main: '火' }],
    ['p', { list: range(0, 7), main: '之' }],
  ],
  // 折
  z: [
    ['n', { list: range(0, 13), main: '已' }],
    ['b', { list: range(0, 12), main: '子' }],
    ['v', { list: range(0, 7), main: '女' }],
    ['c', { list: range(0, 7), main: '又' }],
    ['x', { list: range(0, 9), main: '幺' }],
  ],
} as const

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

console.log(wubiXsjRootList)

export enum InputStatus {
  waiting = 'waiting',
  right = 'right',
  wrong = 'wrong',
  timeout = 'timeout',
}
