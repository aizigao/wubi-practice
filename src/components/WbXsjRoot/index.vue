<script setup lang="ts">
import { data } from './config'
import { wubiXsjData } from '~/constants'

interface Props {
  rootKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  rootKey: 'z-0',
})

const hData = wubiXsjData.h
const sData = wubiXsjData.s
const pData = wubiXsjData.p
const nData = wubiXsjData.n
const zData = wubiXsjData.z

const rootRef = useTemplateRef('rootRef')
const wrapRef = useTemplateRef('wrapRef')
const wrapStyle = ref({})
onMounted(() => {
  const wrapRefRect = wrapRef.value!.getBoundingClientRect()
  const rootRefRect = rootRef.value!.getBoundingClientRect()
  const ratio = wrapRefRect.width / rootRefRect.width
  wrapStyle.value = {
    width: `100%`,
    height: `${rootRefRect.height * ratio}px`,
    transform: `scale(${ratio})`,
  }
})

function isActive(i: any) {
  const rootKeyList = props.rootKey.split('-')
  if (i[0] === rootKeyList[0]) {
    if (i[1].list.includes(Number(rootKeyList[1]))) {
      return true
    }
  }
  return false
}
</script>

<template>
  <div>
    <div ref="wrapRef" class="wbWsj-root-wrap-scale" :style="wrapStyle">
      <div ref="rootRef" class="wbWsj-root">
        <!-- // 横 -->
        <div class="wbWsj-root-part wbWsj-root-part--h">
          <div
            v-for="i in hData.toReversed()" :key="i[0]" class="wbWsj-root-item"
            :class="isActive(i) && 'wbWsj-root-item--active'" :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
        <!-- // 竖 -->
        <div class="wbWsj-root-part wbWsj-root-part--s">
          <div
            v-for="i in sData" :key="i[0]" class="wbWsj-root-item" :class="isActive(i) && 'wbWsj-root-item--active'"
            :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
        <!-- // 撇 -->
        <div class="wbWsj-root-part wbWsj-root-part--p">
          <div
            v-for="i in pData.toReversed()" :key="i[0]" class="wbWsj-root-item"
            :class="isActive(i) && 'wbWsj-root-item--active'" :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
        <!-- 捺 -->
        <div class="wbWsj-root-part wbWsj-root-part--n">
          <div
            v-for="i in nData" :key="i[0]" class="wbWsj-root-item" :class="isActive(i) && 'wbWsj-root-item--active'"
            :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
        <!-- 折 -->
        <div class="wbWsj-root-part wbWsj-root-part--z">
          <div
            v-for="i in zData.toReversed()" :key="i[0]" class="wbWsj-root-item"
            :class="isActive(i) && 'wbWsj-root-item--active'" :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wbWsj-root-wrap-scale {
  width: 100%;
  will-change: transform;
  transform-origin: 0 0;
}

.wbWsj-root {
  background: url('~/assets/wubi_root/xsj-main.jpg') no-repeat center center / 100% 100%;
  height: 100%;
  width: 1457px * 2;
  height: 609px * 2;
  position: relative;

  .wbWsj-root-item {
    width: 238px;
    height: 296px;
    border-radius: 34px;
    overflow: hidden;
    margin-right: 45px;
    flex-shrink: 0;

    &:last-child {
      margin-right: 0;
    }

    &.wbWsj-root-item--active {
      background: rgba(#000, 0.2);
      box-shadow: 0 0 20px 0 rgba(#000, 0.5);
    }
  }

  .wbWsj-root-part {
    // background: rgba(green, 0.5);
    position: absolute;
    display: flex;
  }

  .wbWsj-root-part--h {
    width: 1531px;
    height: 412px;
    left: 0;
    top: 395px;
    padding-top: 60px;
    padding-left: 135px;
    padding-right: 32px;

    .wbWsj-root-item:nth-child(1) {
      // margin-right: 45px;
    }

    .wbWsj-root-item:nth-child(2) {
      // margin-right: 37px;
    }

    .wbWsj-root-item:nth-child(3) {
      margin-right: 44px;
      width: 236px;
    }

    .wbWsj-root-item:nth-child(4) {
      // margin-right: 36px;
    }
  }

  .wbWsj-root-part--s {
    width: 1135px;
    height: 412px;
    left: 1542px;
    top: 395px;
    padding-top: 60px;
    padding-left: 30px;
    padding-right: 32px;

    .wbWsj-root-item:nth-child(1) {
      // margin-right: 45px;
    }

    .wbWsj-root-item:nth-child(2) {
      // margin-right: 37px;
    }

    .wbWsj-root-item:nth-child(3) {
      margin-right: 44px;
      width: 236px;
    }

    .wbWsj-root-item:nth-child(5) {
      // margin-right: 36px;
      position: absolute;
      left: 429px;
      top: 481px;
    }
  }

  .wbWsj-root-part--p {
    width: 1453px;
    height: 384px;
    position: absolute;
    left: 0;
    top: 0;
    padding-top: 44px;
    padding-left: 67px;
    padding-right: 32px;

    .wbWsj-root-item:nth-child(1) {
      margin-right: 45px;
    }

    .wbWsj-root-item:nth-child(2) {
      margin-right: 37px;
    }

    .wbWsj-root-item:nth-child(3) {
      // margin-right: 37px;
    }

    .wbWsj-root-item:nth-child(4) {
      margin-right: 36px;
    }
  }

  .wbWsj-root-part--n {
    width: 1446px;
    height: 384px;
    position: absolute;
    left: 1464px;
    top: 0;
    padding-top: 44px;
    padding-left: 29px;

    .wbWsj-root-item:nth-child(1) {
      margin-right: 40px;
    }

    .wbWsj-root-item:nth-child(2) {
      margin-right: 42px;
    }

    .wbWsj-root-item:nth-child(3) {
      // margin-right: 37px;
    }

    .wbWsj-root-item:nth-child(4) {
      margin-right: 36px;
    }
  }

  .wbWsj-root-part--z {
    width: 1427px;
    height: 401px;
    left: 503px;
    top: 818px;
    padding-top: 58px;
    padding-left: 31px;

    .wbWsj-root-item:nth-child(1) {
      // margin-right: 45px;
    }

    .wbWsj-root-item:nth-child(2) {
      // margin-right: 37px;
    }

    .wbWsj-root-item:nth-child(3) {
      margin-right: 44px;
      width: 236px;
    }

    .wbWsj-root-item:nth-child(4) {
      // margin-right: 36px;
    }
  }
}
</style>
