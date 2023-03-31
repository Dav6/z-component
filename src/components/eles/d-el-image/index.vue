
<!--
  author: 戴伟
  date: 017 2023/01/17 09:52:11
  file: src\components\eles\d-el-image\index.vue
  des:
    do.....
-->

<template>
  <el-image
    :hide-on-click-modal="true" :fit="fit" :src="src" :lazy="lazy"
    :style="{ width: widthCOM, height: heightCOM, borderRadius: borderRadiusCOM }"
    :preview-src-list="previewList"
    :initial-index="initialIndex"
    :close-on-press-escape="closeOnPressEscapeCOM" :z-index="zIndex" :preview-teleported="previewTeleported">
    <template #error>
      <div class="mine-el-image-error D-abso D-abso-XY-center D-white-space-nowrap">{{ errorTxtCOM(src) }}</div>
    </template>
  </el-image>
</template>

<script setup>
defineOptions({
  name: 'd-el-image',
});
import {ref, reactive, computed, watch} from "vue"

const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
  },
  src: {
    type: [String]
  },
  size: {
    type: [String],
  },
  //fill / contain / cover / none / scale-down
  fit: {
    type: [String],
    default: 'cover'
  },
  initialIndex: {
    type: [Number],
  },
  previewList: {
    type: [Array]
  },
  //设置图片预览的 z-index
  zIndex: {
    type: [Number]
  },
  lazy: {
    type: [Boolean],
  },
  borderRadius: {
    type: [String, Number]
  },
  //是否可以通过按下 ESC 关闭 Image Viewer
  closeOnPressEscape: {
    type: [Boolean],
    default: true
  },

  //image-viewer 是否插入至 body 元素上。
  // 嵌套的父元素属性会发生修改时应该将此属性设置为 true
  previewTeleported: {
    type: [Boolean],
    // default: true
  },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);
const closeOnPressEscapeCOM = computed(() => {
  return props.closeOnPressEscape;
})


const errorTxtCOM = computed(() => {
  return (data) => {
    // src?(src.indexOf('http')>-1?'加载失败':src):''
    // console.log(data);
    let _txt = '加载失败';
    // _txt = data?data:'';

    return _txt
  }


})


const widthCOM = computed(() => {
  if (String(props.size).split(' ')[0] !== '') {
    // console.log('havewidth')
    if (String(String(props.size).split(' ')[0]).indexOf('%') > -1) {
      return String(String(props.size).split(' ')[0])
    } else {
      return Number(String(props.size).split(' ')[0]) + 'px';
    }
  } else {
    return 'auto';
  }
});
const heightCOM = computed(() => {
  if (String(props.size).split(' ')[1] !== '') {
    // console.log('haveheight')
    if (String(String(props.size).split(' ')[1]).indexOf('%') > -1) {
      return String(String(props.size).split(' ')[1])
    } else {
      return Number(String(props.size).split(' ')[1]) + 'px';

    }
  } else {
    // console.log('height kongs')
    return 'auto';
  }
});
const borderRadiusCOM = computed(() => {
  return props.borderRadius ? props.borderRadius : 0

});



// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">
.mine-el-image-error {
  position: absolute;
}
</style>

