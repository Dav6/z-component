<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-select
    class="form-select"
    v-model="item.value"
    :value-key="item.valueKey"
    :disabled="item.disabled"
    :multiple="item.multiple"
    :collapse-tags="item.collapseTags"
    :collapse-tags-tooltip="item.collapseTagsTooltip"
    :placeholder="placeholderCOM(item)"
    :clearable="item.clearable"
    :filterable="item.filterable"
  >
    <el-option v-for="(oItem, oIndex) in item.options" :key="oIndex" :label="oItem.label"
               :disabled="oItem.disabled" :value="oItem.value"/>

  </el-select>
</template>

<script setup>
defineOptions({
  name: 'd-el-select',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean, Number, Object, Array],
  },
  item: {
    type: [Object],
  }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

const placeholderCOM = computed(() => {
  return (data) => {
    // console.log('placeholderCOM',data);
    if (data.placeholder) return data.placeholder;
    let _placeholder = '';
    let _placeholderPrefix = '';
    _placeholderPrefix = '请选择';
    _placeholder = `${_placeholderPrefix}${data.name}`
    return _placeholder;
  }
})


const radioComponentCOM = computed(() => {
  let _component = 'el-radio'
  if (props.item.isRadioButton) {
    _component = 'el-radio-button'
  } else {

  }

  return _component;
})


// section formTypeKeyMap
const radioKeyMap = ref({
  input: 'd-el-input',
  inputNumber: 'd-el-input-number',
  radio: 'd-el-radio'
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