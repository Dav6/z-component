<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-input
    class="form-input"
    :disabled="item.disabled"
    v-model="item.value"
    :clearable="item.clearable"
    :max="item.max" :min="item.min"
    :maxlength="item.maxlength"
    :minlength="item.minlength"
    :show-word-limit="item.showWordLimit"
    :show-password="item.showPassword"
    :prefix-icon="item.prefixIcon"
    :suffix-icon="item.suffixIcon"

    :rows="item.rows ? item.rows : 5"

    :type="item.type"

    :placeholder="placeholderCOM(item)"
  />
</template>

<script setup>
defineOptions({
  name: 'd-el-input',
});
import {ref, reactive, computed, watch} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String, Boolean],
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
    let _placeholderPrefix = '' ;
    _placeholderPrefix = '请输入'

    _placeholder = `${_placeholderPrefix}${data.name}`
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