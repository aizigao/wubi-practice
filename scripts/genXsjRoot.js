import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import _ from 'lodash-es'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const rootImgDir = path.resolve(__dirname, '../public/root-xsj')
const targetFile = path.resolve(__dirname, '../src/constants/wubiXsjRootList.ts')

const baseMap = {
  // 横
  h: [
    ['g', { list: [], main: '王' }],
    ['f', { list: [], main: '土' }],
    ['d', { list: [], main: '大' }],
    ['s', { list: [], main: '木' }],
    ['a', { list: [], main: '工' }],
  ],
  // 竖
  s: [
    ['h', { list: [], main: '目' }],
    ['j', { list: [], main: '日' }],
    ['k', { list: [], main: '口' }],
    ['l', { list: [], main: '田' }],
    ['m', { list: [], main: '山' }],
  ],
  // 撇
  p: [
    ['t', { list: [], main: '禾' }],
    ['r', { list: [], main: '白' }],
    ['e', { list: [], main: '月' }],
    ['w', { list: [], main: '人' }],
    ['q', { list: [], main: '金' }],
  ],
  // 捺
  n: [
    ['y', { list: [], main: '言' }],
    ['u', { list: [], main: '立' }],
    ['i', { list: [], main: '水' }],
    ['o', { list: [], main: '火' }],
    ['p', { list: [], main: '之' }],
  ],
  // 折
  z: [
    ['n', { list: [], main: '已' }],
    ['b', { list: [], main: '子' }],
    ['v', { list: [], main: '女' }],
    ['c', { list: [], main: '又' }],
    ['x', { list: [], main: '幺' }],
  ],
}

async function getRList(char) {
  const charDir = path.resolve(rootImgDir, char)
  const files = await fs.readdir(charDir)
  const fileNames = files.map(i => i.replace(/\.png$/, '')).map(i => Number(i)).sort((a, b) => a - b)
  return fileNames
}

async function writeFile(str) {
  await fs.writeFile(targetFile, str, { encoding: 'utf-8' })
}

async function main() {
  const promises = []
  Object.entries(baseMap).forEach(([type, obj]) => {
    obj.forEach(([char], idx) => {
      const promise = getRList(char).then((rList) => {
        _.set(baseMap, [type, idx, 1, 'list'], rList)
      })
      promises.push(promise)
    })
  })
  await Promise.all(promises) // 等待所有 Promise 完成
  await writeFile(`export default ${JSON.stringify(baseMap)} as const`)
  console.log('---------ok-----------')
}

main()
