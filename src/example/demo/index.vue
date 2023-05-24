<!--
  author: 戴伟
  date: 019 2022/12/19 09:14:02
  file: src\example\dialog\index.vue
  des:
    do.....
-->

<template>
  <div class="container-box">
    <d-import-button ></d-import-button>

  </div>
</template>

<script setup>
defineOptions({
  name: "测试案例",
  key: 'example-test',
  isExposed: false
});
import {ref, reactive, computed, watch} from "vue"

const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
  },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);



const defaultCOM = computed(() => {
  return '';
});



// console.log('cutBg', cutBgWidth)
// setTimeout(()=>cutWidth.value = 20,1000)

const goTo = (key, data) => {
  if (key == 'show') {
    isShow.value = true;
  }
  if (key == 'cancel') {
    isShow.value = false;
  }
}

// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">
.container-box {
  position: relative;
  padding: 2px;
  background: #999999;
  height: 600px;
}


</style>