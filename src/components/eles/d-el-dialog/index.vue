<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>

  <Component
    :is="'el-dialog'"
    v-bind="$props"
  >
    <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
      <slot :name="item.name" :data="data.data"></slot>
    </template>
  </Component>

</template>

<script setup >
defineOptions({
  name: 'd-el-dialog',
});

import {ref, reactive, computed, watch, useSlots} from "vue"
let slots = useSlots()
// console.log('d-el-dialog-slots',slots)

const slotListCOM = computed(() => {
  return () => {
    let _slots = [];
    _slots = Object.keys(slots) || [];
    _slots = _slots?.map(item => {
      return {
        name: item,
      }
    })
    return _slots
  }
})



const props = defineProps({
  // 配合emits v-model
  // modelValue: {
  //   type: [String, Boolean, Number, Object, Array],
  // },
  // item: {
  //   type: [Object],
  // }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);





// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

</style>