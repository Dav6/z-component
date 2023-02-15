<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-input-number
    class="form-input-number" :class="{ textAlignLeft: data?.textAlign == 'left' }"
    :disabled="data?.disabled" v-model.number="modelValue" :min="data?.min" :max="data?.max"
    :step="data?.step"
    :precision="data?.precision" :clearable="data?.clearable" :placeholder="placeholderCOM(data)"
    :controls="data?.controls" :controls-position="data?.controlsPosition"
  />
</template>

<script setup>
defineOptions({
  name: 'd-el-input-number',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [Number,String],
  },
  data: {
    type: [Object],
    default:()=>{
      return {
        value:undefined,
      }
    }
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
    _placeholderPrefix = '请输入';
    let _name = data?.name || '';
    _placeholder = `${_placeholderPrefix}${_name}`
    return _placeholder;
  }
})

// const item = computed(()=>{
//   let _item = props.item;
//   if (_data?.value) {
//     _data?.value = Number(_data?.value)
//   } else {
//     _data?.value = undefined;
//   }
//   return _item;
// })



// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

</style>