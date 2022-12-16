<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-cascader
    class="form-cascader"   v-model="item.value"
    :options="item.options" :clearable="item.clearable"
    :placeholder="placeholderCOM(item)"
    :disabled="item.disabled"
    :props="item.props"/>
</template>

<script setup>
defineOptions({
  name: 'd-el-cascader',
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