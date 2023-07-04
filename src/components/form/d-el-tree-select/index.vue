<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-tree-select
    class="form-tree-select"
    v-model="modelValue"
    :data="optionsCOM"
    :clearable="data?.clearable"
    :multiple="data?.multiple"
    :collapse-tags="data?.collapseTags"
    :collapse-tags-tooltip="data?.collapseTagsTooltip"
    :treeNodeKey="data?.treeNodeKey"
    :check-on-click-node="data?.checkOnClickNode"
    :check-strictly="data?.checkStrictly"
    :render-after-expand="data?.renderAfterExpand"
    :default-expanded-keys="data?.defaultExpandedKeys"
    :show-checkbox="data?.showCheckbox"
    :disabled="data?.disabled"
    :filterable="data?.filterable"
    :placeholder="placeholderCOM(data)"
    :props="data?.props"
    v-bind="$attrs"

  >

  </el-tree-select>
</template>

<script setup>
defineOptions({
  name: 'd-el-tree-select',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean, Number, Object, Array],
  },
  data: {
    type: [Object],
    default:{},
  },
  options: {
    type: [Array]
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
const optionsCOM = computed(() => {
  let _options = [];
  if (props.options?.length > 0) {
    _options = props.options
  }
  //  最终取 data 里的options
  if (props.data?.options?.length > 0) {
    _options = props.data?.options
  }


  return _options
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