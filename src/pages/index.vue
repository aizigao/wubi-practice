<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { flatten, uniq } from 'lodash-es'
import { NButton } from 'naive-ui'
import { InputStatus, wubiXsjData, wubiXsjRootList } from '~/constants'

// const current = wubiXsjRootList
function getRandomRoot(charList: any[]) {
  // 随机先一个字母
  const charIdx = Math.floor(Math.random() * 24)
  const char = String.fromCharCode(97 + charIdx)

  const charData = charList.filter(i => i.char === char)

  const charX = charData[Math.floor(Math.random() * charData.length)]
  console.log('char', char, charData, charX.key)
  return charX.key
}

const currentRootKey = ref(getRandomRoot(flatten(Object.values(wubiXsjRootList))))

const inputStatus = ref<InputStatus>(InputStatus.waiting)

const hChars = wubiXsjData.h.map(i => i[0])
const sChars = wubiXsjData.s.map(i => i[0])
const pChars = wubiXsjData.p.map(i => i[0])
const nChars = wubiXsjData.n.map(i => i[0])
const zChars = wubiXsjData.z.map(i => i[0])

const errorList = reactive<Map<string, number>>(new Map())
const countMap = reactive({
  right: 0,
  wrong: 0,
})

onKeyStroke([
  ...hChars,
  ...sChars,
  ...pChars,
  ...nChars,
  ...zChars,
], async (e) => {
  e.preventDefault()
  const { key: char } = e
  // if (lastInput === char) {
  //   return
  // }
  // lastInput = char
  inputStatus.value = InputStatus.waiting
  const [currentChar] = currentRootKey.value.split('-')
  if (char === currentChar) {
    currentRootKey.value = getRandomRoot(flatten(Object.values(wubiXsjRootList)))
    inputStatus.value = InputStatus.waiting
    countMap.right += 1
  }
  else {
    inputStatus.value = InputStatus.wrong
    countMap.wrong += 1
    if (!errorList.has(currentRootKey.value)) {
      errorList.set(currentRootKey.value, 1)
    }
    else {
      errorList.set(currentRootKey.value, errorList.get(currentRootKey.value)! + 1)
    }
  }
})
const rightRatio = computed(() => {
  if ((countMap.right + countMap.wrong) === 0)
    return '--'
  const ratio = countMap.right / (countMap.right + countMap.wrong)
  return `${(ratio * 100).toFixed(2)}%`
})

function onWrongRetry() {

}
</script>

<template>
  <div class="page">
    <div class="mb-1 flex items-center">
      <div color-green>
        对: {{ countMap.right }}
      </div>
      <div ml-1 color-red>
        错: {{ countMap.wrong }}
      </div>
      <!-- <div>重练错误字根</div> -->
      <div ml-1 color-gray>
        正确率: {{ rightRatio }}
      </div>
      <!-- <div>速度: </div> -->
    </div>
    <WbXsjWrongList :wrong-map="errorList" />
    <WbXsjRoot class="root-comp" :root-key="currentRootKey" :input-status="inputStatus" />
  </div>
</template>

<style lang="less">
.page {
  height: 100%;
  padding: 32px;
  width: 80%;
  min-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.root-comp {
  width: 1100px;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
