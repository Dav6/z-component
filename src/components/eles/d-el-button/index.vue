<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>

  <Component
    :is="componentName"
    v-bind="$props"
  >
    <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
      <slot :name="item.name" :data="data?.data"></slot>
    </template>
  </Component>

</template>

<script setup >
defineOptions({
  name: 'd-el-button',
});

import {ref, reactive, computed, watch, useSlots} from "vue"


const componentName = 'el-button'


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
    // console.log(_slots);
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




//watch(
//  () => props, (newValue, oldValue) => {
//    //console.log('newValue', newValue);
//    //console.log('oldValue', oldValue);
//    // defaultActive = newValue.path;
//
//  },
//   {immediate: true}
//);


// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

</style>