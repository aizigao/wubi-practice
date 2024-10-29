<script setup lang="ts">
import { getRootKeyImg } from '~/utils'

interface Props {
  wrongMap: Map<string, number>
}

const props = withDefaults(defineProps<Props>(), {})

// const emit = defineEmits(['update:show'])
const list = computed(() => {
  return Array.from(props.wrongMap.entries()).sort((a, b) => b[1] - a[1]).map(([key, count]) => {
    return {
      img: getRootKeyImg(key),
      count,
      char: key.split('-')[0],
    }
  },
  )
})
</script>

<template>
  <div class="cont flex flex-col">
    <div v-for="i in list" :key="i.img" class="item">
      <img :src="i.img" alt="">
      <span color-red>X{{ i.count }}</span>
      <span color-green class="char">{{ i.char }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cont {
  height: 100%;
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  border-left: 1px solid #ddd;
  padding: 8px 2px 8px 8px;

  .item {
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    position: relative;
    margin-bottom: 12px;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    span {
      position: absolute;
      left: 8px;
      bottom: 8px;
    }
    .char {
      bottom: auto;
      top: 8px;
    }
  }
}
</style>
