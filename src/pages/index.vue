<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { flatten, shuffle, uniq } from 'lodash-es'
import { NButton, useDialog, useNotification } from 'naive-ui'
import { InputStatus, wubiXsjData, wubiXsjRootList } from '~/constants'

const notification = useNotification()
const dialog = useDialog()

let restKeyList = shuffle(flatten(Object.values(wubiXsjRootList)).map(i => i.key))
const errorRootMap = reactive<Map<string, number>>(new Map())

const inputStatus = ref<InputStatus>(InputStatus.waiting)
const countMap = reactive({
  right: 0,
  wrong: 0,
})

const currentRootKeyList = reactive([])
function renewRootList(type: 'refresh' | 'init' = 'refresh') {
  if (restKeyList.length === 0 && currentRootKeyList.length === 1) {
    if (errorRootMap.size) {
      dialog.warning({
        title: '全部完成啦',
        content: '产生一些错误，开始练习错误？',
        closable: false,
        negativeText: '重新开始',
        onNegativeClick() {
          genRestKeyList()
          renewRootList('init')
        },
        positiveText: '练习错误',
        onPositiveClick() {
          onWrongRetry()
        },
      })

      return
    }
    dialog.info({
      title: '全部完成啦',
      content: '秀儿说的就是你吧',
      closable: false,
      positiveText: '再来一次',
      onPositiveClick() {
        genRestKeyList()
        renewRootList('init')
      },
    })
    return
  }
  if (type === 'init') {
    currentRootKeyList.splice(0, currentRootKeyList.length)
    currentRootKeyList.push(...restKeyList.splice(0, 5))
    countMap.right = 0
    countMap.wrong = 0
    inputStatus.value = InputStatus.waiting
  }
  else {
    currentRootKeyList.shift()
    currentRootKeyList.push(...restKeyList.splice(0, 1))
  }
}
renewRootList('init')

const currentRootKey = computed(() => {
  return currentRootKeyList[0]
})

const hChars = wubiXsjData.h.map(i => i[0])
const sChars = wubiXsjData.s.map(i => i[0])
const pChars = wubiXsjData.p.map(i => i[0])
const nChars = wubiXsjData.n.map(i => i[0])
const zChars = wubiXsjData.z.map(i => i[0])

const practiceOptions = [
  { label: '所有区域', value: 'all' },
  { label: '横区', value: 'h' },
  { label: '竖区', value: 's' },
  { label: '撇区', value: 'p' },
  { label: '捺区', value: 'n' },
  { label: '折区', value: 'z' },
]
const practiceActive = ref(practiceOptions[0].value)

function genRestKeyList() {
  if (practiceActive.value === 'all') {
    restKeyList = shuffle(flatten(Object.values(wubiXsjRootList)).map(i => i.key))
  }
  else {
    restKeyList = shuffle(
      flatten(
        wubiXsjData[practiceActive.value].map(([char, { list }]) => {
          return list.map((i) => {
            return `${char}-${i}`
          })
        }),
      ),
    )
  }
}
watch(practiceActive, () => {
  genRestKeyList()
  renewRootList('init')
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
  inputStatus.value = InputStatus.waiting
  const [currentChar] = currentRootKey.value.split('-')
  if (char === currentChar) {
    renewRootList()
    inputStatus.value = InputStatus.waiting
    countMap.right += 1
  }
  else {
    inputStatus.value = InputStatus.wrong
    countMap.wrong += 1
    if (!errorRootMap.has(currentRootKey.value)) {
      errorRootMap.set(currentRootKey.value, 1)
    }
    else {
      errorRootMap.set(currentRootKey.value, errorRootMap.get(currentRootKey.value)! + 1)
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
  if (errorRootMap.size === 0) {
    notification.warning({ content: '当前没有错误啊, 棒棒的!', duration: 1500 })
    return
  }
  const wrongKeys = Array.from(errorRootMap.keys())
  errorRootMap.clear()
  restKeyList = shuffle(wrongKeys)
  renewRootList('init')
}
</script>

<template>
  <div class="page">
    <div class="mb-4 flex items-center">
      <div color-green>
        对: {{ countMap.right }}
      </div>
      <div ml-1 color-red>
        错: {{ countMap.wrong }}
      </div>
      <div ml-1 color-gray>
        正确率: {{ rightRatio }}
      </div>
      <n-space vertical ml-3 w-26>
        <n-select v-model:value="practiceActive" :options="practiceOptions" />
      </n-space>
      <NButton ml-2 @click="onWrongRetry">
        错题重练
      </NButton>
    </div>
    <WbXsjWrongList :wrong-map="errorRootMap" @wrong-retry="onWrongRetry" />
    <WbXsjRoot class="root-comp" :root-key-list="currentRootKeyList" :input-status="inputStatus" />
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
  width: 960px;
  margin: 0 auto;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
