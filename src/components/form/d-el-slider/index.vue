<!--
  author: 戴伟
  date: 015 2022/12/15 11:14:19
  file: src\components\form\d-el-input.vue
  des:
    do.....
-->

<template>
  <el-slider
    class="form-slider "
    :style="styleCOM"
    :class="classCOM"
    :disabled="data?.disabled"
    v-model="modelValue"
    :min="minCOM"
    :max="maxCOM"
    :step="data?.step"
    :show-input="data?.showInput"
    :show-input-controls="data?.showInputControls"
    :size="data?.size"
    :input-size="data?.inputSize"
    :show-stops="data?.showStops"
    :show-tooltip="data?.showTooltip"
    :format-tooltip="data?.formatTooltip"
    :range="data?.range"
    :vertical="data?.vertical"
    :height="data?.height"
    :label="data?.label"
    :range-start-label="data?.rangeStartLabel"
    :range-end-label="data?.rangeEndLabel"
    :format-value-text="data?.formatValueText"
    :debounce="data?.debounce"
    :tooltip-class="data?.tooltipClass"
    :placement="data?.placement"
    :marks="data?.marks"
    :validate-event="data?.validateEvent"
  />
</template>

<script setup>
defineOptions({
  name: 'd-el-slider',
});
import {
  ref,
  reactive,
  computed,
  watch
} from "vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [Number, String,Array],
  },
  data: {
    type: [Object],
    default: () => {
      return {
      }
    }
  }
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
    _placeholderPrefix = '请输入';
    let _name = data?.name || '';
    _placeholder = `${_placeholderPrefix}${_name}`
    return _placeholder;
  }
})

const minCOM = computed(()=>{
  let _data = props.data;

  let _min = _data?.min;
  if(_min === +_min){

  }else{
    _min = undefined
  }
  // console.log('_min',_min)

  return _min
})
const maxCOM = computed(()=>{
  let _data = props.data;
  let _max = _data?.max;
  // console.log('_max',_max)
  if(_max === +_max){

  }else{
    _max = undefined
  }
  return _max
})


const classCOM = computed(() => {
  // { textAlignLeft: data?.textAlign == 'left' }
  let _data = props.data;
  let _class = [];
  if (_data?.unit) {
    _class = [..._class, 'unit']
  }
  return _class;
})
const styleCOM = computed(() => {
  let _data = props.data;
  let _style = {
    '--el-input-number-unit': `'${_data?.unit}'`
  }
  return _style

})


// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped
       lang="less">
.form-slider.el-slider {
  &.unit {


    &::after {

      content: "" var(--el-input-number-unit);
      //right: 0;
      //position: absolute;
      height: 100%;
      color: var(--el-color-info);
      //background-color: var(--el-fill-color-light);
      //border-radius: var(--el-input-border-radius);
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      box-shadow: 0 1px 0 0 var(--el-input-border-color) inset,0 -1px 0 0 var(--el-input-border-color) inset, -1px 0 0 0 var(--el-input-border-color) inset;
      padding: 0 20px;
      max-width:5em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex-shrink: 0;

    }

  }
}
</style>