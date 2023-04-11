<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-cascader
    class="form-cascader"
    v-model="modelValue"
    :options="data?.options"
    :size="data?.size"
    :placeholder="placeholderCOM(data)"
    :disabled="data?.disabled"
    :show-all-levels="data?.showAllLevels"
    :collapse-tags="data?.collapseTags"
    :collapse-tags-tooltip="data?.collapseTagsTooltip"
    :separator="data?.separator"
    :filterable="data?.filterable"
    :filter-method="data?.filterMethod"
    :debounce="data?.debounce"
    :before-filter="data?.beforeFilter"
    :teleported="data?.teleported"
    :popper-append-to-body="data?.popperAppendToBody"
    :tag-type="data?.tagType"
    :validate-event="data?.validateEvent"
    :props="data?.props"
    v-bind="$attrs"

  />
</template>

<script setup>
defineOptions({
  name: 'd-el-cascader',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [Array,String,Number],
  },
  data: {
    type: [Object],
    default:{},
  },
  
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue"]);
const modelValue = computed({ // 重新定义
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
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