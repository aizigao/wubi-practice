<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { s } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'
import { wubiXsjData, wubiXsjRootList } from '~/constants'

// const current = wubiXsjRootList
function getRandomRoot() {
  const len = wubiXsjRootList.length
  return wubiXsjRootList[Math.floor(Math.random() * len)].key
}

const currentRootKey = ref(getRandomRoot())

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
], (e) => {
  e.preventDefault()
  // console.log(e)
  const { key: char } = e
  const [currentChar] = currentRootKey.value.split('-')
  if (char === currentChar) {
    currentRootKey.value = getRandomRoot()
  }
  else {
    alert('失败')
  }
})
</script>

<template>
  <div class="page">
    <WbXsjRoot class="root-comp" :root-key="currentRootKey" />
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
