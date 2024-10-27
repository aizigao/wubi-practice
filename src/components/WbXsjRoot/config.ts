import { range } from 'lodash-es'
// type Data  = Record<>
// 横

export const data = {
  // 横
  h: [
    ['g', { list: range(1, 8), main: '王' }],
    ['f', { list: range(1, 9), main: '土' }],
    ['d', { list: range(1, 9), main: '大' }],
    ['s', { list: range(1, 5), main: '木' }],
    ['a', { list: range(1, 14), main: '工' }],
  ],
  // 竖
  s: [
    ['h', { list: range(1, 11), main: '目' }],
    ['j', { list: range(1, 9), main: '日' }],
    ['k', { list: range(1, 5), main: '口' }],
    ['l', { list: range(1, 12), main: '田' }],
    ['m', { list: range(1, 9), main: '山' }],
  ],
  // 撇
  p: [
    ['t', { list: range(1, 9), main: '禾' }],
    ['r', { list: range(1, 11), main: '白' }],
    ['e', { list: range(1, 15), main: '月' }],
    ['w', { list: range(1, 8), main: '人' }],
    ['q', { list: range(1, 14), main: '金' }],
  ],
  // 捺
  n: [
    ['y', { list: range(1, 9), main: '言' }],
    ['u', { list: range(1, 11), main: '立' }],
    ['i', { list: range(1, 13), main: '水' }],
    ['o', { list: range(1, 10), main: '火' }],
    ['p', { list: range(1, 8), main: '之' }],
  ],
  // 折
  z: [
    ['n', { list: range(1, 9), main: '已' }],
    ['b', { list: range(1, 9), main: '子' }],
    ['v', { list: range(1, 9), main: '女' }],
    ['c', { list: range(1, 9), main: '又' }],
    ['x', { list: range(1, 9), main: '幺' }],
  ],
} as const
