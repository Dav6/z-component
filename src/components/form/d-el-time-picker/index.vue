<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-time-picker
    class="form-time-picker"
    v-model="modelValue"
    :disabled="data?.disabled"
    :readonly="data?.readonly"
    :clearable="data?.clearable"
    :placeholder="placeholderCOM(data)"
    :is-range="data?.isRange"
    :range-separator="data?.rangeSeparator ? data?.rangeSeparator : '-'"
    :start-placeholder="data?.startPlaceholder" :end-placeholder="data?.endPlaceholder"
    :disabled-hours="data?.disabledHours?data?.disabledHours:undefined"
    :disabled-minutes="data?.disabledMinutes?data?.disabledMinutes:undefined"
    :disabled-seconds="data?.disabledSeconds?data?.disabledSeconds:undefined"
    :default-value="data?.defaultValue"
    :prefix-icon="data?.prefixIcon"
    :clear-icon="data?.clearIcon"
    :format="data?.format ? data?.format : 'HH:mm:ss'"
    :teleported="data?.teleported"
    :value-format="data?.valueFormat ? data?.valueFormat : 'HH:mm:ss'"
    v-bind="$attrs"

  />
</template>

<script setup>
defineOptions({
  name: 'd-el-time-picker',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean, Number, Object, Array],
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
    let _name = data?.name || '';
    _placeholderPrefix = '请选择';
    _placeholder = `${_placeholderPrefix}${_name}`
    return _placeholder;
  }
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