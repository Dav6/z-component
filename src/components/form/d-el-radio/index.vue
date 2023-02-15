<!--
  @Author: 戴伟
  @Date: 2023-02-13 11:45:27
  @FilePath: src\components\form\d-el-radio\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->

<template>
  <el-radio-group
    v-model="modelValue"
    :disabled="data?.disabled"
    :min="data?.min"
    :max="data?.max"
  >
    <Component
      :is="radioComponentCOM"
      v-for="(oItem, oIndex) in data?.options" :key="oIndex" :label="oItem.value"
      :border="data?.isRadioBorder"
    >
      {{ oItem.label }}

    </Component>

  </el-radio-group>
</template>

<script setup>
defineOptions({
  name: 'd-el-radio',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean,Number,Object,Array],
  },
  data: {
    type: [Object],
  }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue"]);
const modelValue = computed({ // 重新定义
  get: () => props.modelValue ,
  set: (value) =>  emits("update:modelValue", value),
})


const placeholderCOM = computed(() => {
  return (data) => {
    // console.log('placeholderCOM',data);
    if (data?.placeholder) return data?.placeholder;
    let _placeholder = '';
    let _placeholderPrefix = '';
    _placeholderPrefix = '请选择';
    let _name = data?.name || '';
    _placeholder = `${_placeholderPrefix}${_name}`
    return _placeholder;
  }
})


const radioComponentCOM = computed(() => {
  let _component = 'el-radio'
  if(props.data?.isRadioButton){
    _component = 'el-radio-button'
  }else{

  }

  return _component;
})




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