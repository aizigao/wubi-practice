<script setup lang="ts">
import { InputStatus, wubiXsjData } from '~/constants'
import { getRootKeyImg } from '~/utils'

interface Props {
  rootKeyList?: string[]
  inputStatus: InputStatus
}

const props = withDefaults(defineProps<Props>(), {
  rootKeyList: () => ['z-0'],
  inputStatus: InputStatus.waiting,
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

const currentRootKey = computed(() => {
  return props.rootKeyList[0]
})
function isActive(i: any) {
  const rootKeyList = currentRootKey.value.split('-')
  if (i[0] === rootKeyList[0]) {
    if (i[1].list.includes(Number(rootKeyList[1]))) {
      return true
    }
  }
  return false
}

const rootKeyImgs = computed(() => {
  return props.rootKeyList.map(i => getRootKeyImg(i))
})
</script>

<template>
  <div>
    <div pos-relative flex justify-center>
      <div
        v-for="i, idx in rootKeyImgs" :key="i" class="wbWsj-root-img"
        :class="[idx === 0 && `wbWsj-root-img--${inputStatus}`, `wbWsj-root-img--${idx}`]" :style="{
          zIndex: rootKeyImgs.length - idx,
          transform: `scale(${1 - idx * .08}) translateX(${132 * idx}px) `,
        }"
      >
        <img :src="i" alt="">
      </div>
    </div>
    <div ref="wrapRef" class="wbWsj-root-wrap-scale" :style="wrapStyle">
      <div ref="rootRef" class="wbWsj-root" :class="`wbWsj-root--${props.inputStatus}`">
        <!-- // 横 -->
        <div class="wbWsj-root-part wbWsj-root-part--h">
          <div
            v-for="i in hData.toReversed()" :key="i[0]" class="wbWsj-root-item"
            :class="isActive(i) && 'wbWsj-root-item--current'" :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
        <!-- // 竖 -->
        <div class="wbWsj-root-part wbWsj-root-part--s">
          <div
            v-for="i in sData" :key="i[0]" class="wbWsj-root-item" :class="isActive(i) && 'wbWsj-root-item--current'"
            :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
        <!-- // 撇 -->
        <div class="wbWsj-root-part wbWsj-root-part--p">
          <div
            v-for="i in pData.toReversed()" :key="i[0]" class="wbWsj-root-item"
            :class="isActive(i) && 'wbWsj-root-item--current'" :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
        <!-- 捺 -->
        <div class="wbWsj-root-part wbWsj-root-part--n">
          <div
            v-for="i in nData" :key="i[0]" class="wbWsj-root-item" :class="isActive(i) && 'wbWsj-root-item--current'"
            :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
        <!-- 折 -->
        <div class="wbWsj-root-part wbWsj-root-part--z">
          <div
            v-for="i in zData.toReversed()" :key="i[0]" class="wbWsj-root-item"
            :class="isActive(i) && 'wbWsj-root-item--current'" :data="i[0]"
          >
            {{ i[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wbWsj-root-img-wrap {
}

.wbWsj-root-img {
  margin: 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #ddd;
  margin-bottom: 24px;
  position: absolute;
  background: #fff;
  transform-origin: center center;
  transition: 0.3s ease-out transform;

  img {
    opacity: 0.2;
  }

  &.wbWsj-root-img--0 {
    position: static;

    img {
      opacity: 1;
    }
  }

  &.wbWsj-root-img--wrong {
    border: 2px solid red;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.current-char {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;

  &.current-char--wrong {
    color: red;
  }
}

.wbWsj-root-wrap-scale {
  width: 100%;
  will-change: transform;
  transform-origin: 0 0;
}

.wbWsj-root {
  background: url('/xsj/xsj-main.webp') no-repeat center center / 100% 100%;
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
    color: transparent;

    &:last-child {
      margin-right: 0;
    }

    transition:
      background ease-out 0.2s,
      box-shadow ease-out 0.2s;

    &.wbWsj-root-item--current {
      background: rgba(#000, 0.2);
      box-shadow: 0 0 20px 0 rgba(#000, 0.5);
    }
  }

  &.wbWsj-root--wrong.wbWsj-root--wrong.wbWsj-root--wrong {
    .wbWsj-root-item--current.wbWsj-root-item--current {
      background: rgba(#000, 0.1);
      box-shadow:
        0 0 30px 5px rgba(red, 0.5),
        0 0 20px 5px rgba(red, 0.5) inset;
    }
  }

  &.wbWsj-root--right.wbWsj-root--right.wbWsj-root--right {
    .wbWsj-root-item--current.wbWsj-root-item--current {
      background: rgba(green, 0.8);
      box-shadow: 0 0 20px 0 rgba(green, 0.5);
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
