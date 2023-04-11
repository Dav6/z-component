<!--
  @Author: 戴伟
  @Date: 2023-02-13 09:11:49
  @FilePath: src\components\form\d-el-checkbox\index.vue
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
-->

<template>
  <el-checkbox-group
      class="d-checkbox-group-default"
      v-model="modelValue"
      :disabled="data?.disabled"
      :class="classCOM"
      v-bind="$attrs"

  >
    <Component
        :is="checkboxComponentCOM"
        v-for="(oItem, oIndex) in data?.options" :key="oIndex" :label="oItem.value"
        :border="data?.isRadioBorder"
    >
      <d-el-tooltip :content="oItem.label" placement="top" :isShowByContent="isShowByContentCOM"> {{ oItem.label }}</d-el-tooltip>
    </Component>

  </el-checkbox-group>
</template>

<script setup>
defineOptions({
  name: 'd-el-checkbox',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean, Number, Array],
  },
  data: {
    type: [Object],
  },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue"]);
const modelValue = computed({ // 重新定义
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
})


const classCOM = computed(() => {

  let _class = [];

  // if()


  return _class;
})

// data?.isOptionLabelTooltip
const isShowByContentCOM = computed(()=>{
  let _isOptionLabelTooltip = true;
  let _data = props.data;
  let _optionLabelWidth = _data?.optionLabelWidth;

  // console.log('isShowByContentCOM',_optionLabelWidth)

  // if(_optionLabelWidth){
  //   console.log('isShowByContentCOM-you')
  //   _isOptionLabelTooltip = true;
  //
  // }else{
  //   _isOptionLabelTooltip = true;
  //   console.log('isShowByContentCOM-no')
  //
  // }

  return _isOptionLabelTooltip;
})



const labelWidthCOM = computed(() => {
  let _data = props.data;
  let _width = '';
  let _optionLabelWidth = _data?.optionLabelWidth;
  let _widthNum = '';
  let _widthUnit = 'px';
  if (_optionLabelWidth?.toString()?.trim()?.indexOf('calc') == 0) {
    _width = _width;
  }

  _widthNum = parseFloat(_optionLabelWidth);
  if ((_width || _width == 0) && _widthNum >= 0) {
    // console.log('labelWidthCOM-_width', _width)
    // console.log('labelWidthCOM-parseFloat', parseFloat(_optionLabelWidth))
    let _widthArr = _optionLabelWidth.toString().split(_widthNum.toString())
    // console.log('labelWidthCOM-_widthArr', _widthArr)
    _widthUnit = _widthArr?.[1] || 'px';
    _width = _widthNum + _widthUnit;
  }


  return _width


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


const checkboxComponentCOM = computed(() => {
  let _component = 'el-checkbox'
  if (props.data?.isRadioButton) {
    _component = 'el-checkbox-button'
  } else {

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
.d-checkbox-group-default {
  //width: 100%;

  :deep(.el-checkbox__label) {
    width: v-bind('labelWidthCOM');
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
  }

}
</style>