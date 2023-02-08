<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-input-number
    class="form-input-number" :class="{ textAlignLeft: item.textAlign == 'left' }"
    :disabled="item.disabled" v-model.number="item.value" :min="item.min" :max="item.max"
    :step="item.step"
    :precision="item.precision" :clearable="item.clearable" :placeholder="placeholderCOM(item)"
    :controls="item.controls" :controls-position="item.controlsPosition"
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
    type: [Number],

  },
  item: {
    type: [Object],
    default:()=>{
      return {
        value:undefined,
      }
    }
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
    _placeholderPrefix = '请输入';
    _placeholder = `${_placeholderPrefix}${data.name}`
    return _placeholder;
  }
})

const item = computed(()=>{
  let _item = props.item;
  if (_item.value) {
    _item.value = Number(_item.value)
  } else {
    _item.value = undefined;
  }
  return _item;
})



// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

</style>