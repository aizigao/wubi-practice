<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { InputStatus, wubiXsjData, wubiXsjRootList } from '~/constants'
import { delay } from '~/utils'

// const current = wubiXsjRootList
function getRandomRoot() {
  const len = wubiXsjRootList.length
  return wubiXsjRootList[Math.floor(Math.random() * len)].key
}

const currentRootKey = ref(getRandomRoot())
const inputStatus = ref<InputStatus>(InputStatus.waiting)

const hChars = wubiXsjData.h.map(i => i[0])
const sChars = wubiXsjData.s.map(i => i[0])
const pChars = wubiXsjData.p.map(i => i[0])
const nChars = wubiXsjData.n.map(i => i[0])
const zChars = wubiXsjData.z.map(i => i[0])
onKeyStroke([
  ...hChars,
  ...sChars,
  ...pChars,
  ...nChars,
  ...zChars,
], async (e) => {
  e.preventDefault()
  // console.log(e)
  const { key: char } = e
  inputStatus.value = InputStatus.waiting
  const [currentChar] = currentRootKey.value.split('-')
  if (char === currentChar) {
    // inputStatus.value = InputStatus.right
    currentRootKey.value = getRandomRoot()
    inputStatus.value = InputStatus.waiting
  }
  else {
    inputStatus.value = InputStatus.wrong
    // alert('失败')
  }
})
</script>

<template>
  <div class="page">
    {{ currentRootKey }}
    <WbXsjRoot class="root-comp" :root-key="currentRootKey" :input-status="inputStatus" />
  </div>
</template>

<style lang="less">
.page {
  height: 100%;
  padding: 32px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.root-comp {
  width: 800px;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
