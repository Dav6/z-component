<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-input
          ref="inputRef"
    class="form-input"
    v-model="modelValue"
    :disabled="data?.disabled"
    :clearable="data?.clearable"
    :max="data?.max" :min="data?.min"
    :maxlength="data?.maxlength"
    :minlength="data?.minlength"
    :show-word-limit="data?.showWordLimit"
    :show-password="data?.showPassword"
    :prefix-icon="data?.prefixIcon"
    :suffix-icon="data?.suffixIcon"
    :rows="data?.rows ? data?.rows : 5"
    :type="data?.type"
    :placeholder="placeholderCOM(data)"
    v-bind="$attrs"

  >
    <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
      <slot :name="item.name" :data="data.data"></slot>
    </template>
    <template v-if="data?.prepend" #prepend>
      <Component :is="data?.prepend" ></Component>
    </template>
    <template v-if="data?.append" #append>
      <Component :is="data?.append" ></Component>
    </template>


  </el-input>
</template>

<script setup>
defineOptions({
  name: 'd-el-input',
});
import {ref, reactive, computed, watch, useSlots} from "vue"


let slots = useSlots()
// console.log('d-el-dialog-slots',slots)

const slotListCOM = computed(() => {
  return () => {
    let _slots = [];
    _slots = Object.keys(slots) || [];
    _slots = _slots?.map(item => {
      return {
        name: item,
      }
    })
    return _slots
  }
})



const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String,Number],
  },
  data: {
    type: [Object],
  }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue"]);
const modelValue = computed({ // 重新定义
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
})

const inputRef = ref()


const placeholderCOM = computed(() => {
  return (data) => {
    // console.log('placeholderCOM',data);
    if (data?.placeholder) return data?.placeholder;
    let _placeholder = '';
    let _placeholderPrefix = '' ;
    _placeholderPrefix = '请输入'
    let _name = data?.name || '';
    _placeholder = `${_placeholderPrefix}${_name}`
    return _placeholder;
  }
})
// console.log('input-inputRef',inputRef )
const getRef = ()=>{
    return inputRef.value
}


defineExpose({
    ref:getRef
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