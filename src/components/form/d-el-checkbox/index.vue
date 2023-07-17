<!--
  @Author: 戴伟
  @Date: 2023-02-13 09:11:49
  @FilePath: src\components\form\d-el-checkbox\index.vue
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
-->

<template>
    <div class="d-checkbox-box">
        <template v-if="data?.isCheckedAll"  >
            <Component
                :is="checkboxComponentCOM"
                :label="trueLabel"
                v-model="isCheckAll"
                :indeterminate="isIndeterminate"
                @change="data=>goTo('changeAll',data)"
                :border="data?.isRadioBorder"
                class="d-checkbox-all"
            >
                <d-el-tooltip content="全选" placement="top" :isShowByContent="isShowByContentCOM">
                    全选
                </d-el-tooltip>
            </Component>
        </template>


        <el-checkbox-group
            class="d-checkbox-group-default"
            v-model="modelValue"
            :checked="checked"
            :disabled="data?.disabled"
            :class="classCOM"
            :min="data?.min"
            :max="data?.max"
            @change="data=>goTo('change',data)"
            v-bind="$attrs"

        >

            <template v-if="data?.isCheckedAll"  >
                <span class="el-checkbox el-checkbox--default el-checkbox-place"></span>
            </template>
            <Component
                :is="checkboxComponentCOM"
                v-for="(oItem, oIndex) in  options" :key="oIndex" :label="oItem.value"
                :disabled="oItem.disabled"
                :border="data?.isRadioBorder"
            >
                <d-el-tooltip :content="oItem.label" placement="top" :isShowByContent="isShowByContentCOM">
                    {{ oItem.label }}
                </d-el-tooltip>
            </Component>

        </el-checkbox-group>
    </div>

</template>

<script setup>
import {debounce} from "@/tools/tools";

defineOptions({
    name: 'd-el-checkbox',
});
import {ref, reactive, computed, watch} from "vue"
import dayjs from "dayjs";


const props = defineProps({
    // 配合emits v-model
    modelValue: {
        type: [String, Boolean, Number, Array],
    },
    data: {
        type: [Object],
    },
    checked:{
      type: [Boolean]
    },
    options: {
        type: [Array]
    }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue",]);
const modelValue = computed({ // 重新定义
    get: () => props.modelValue,
    set: (value) => emits("update:modelValue", value),
})

console.log('dayjs');


const classCOM = computed(() => {

    let _class = [];

    // if()


    return _class;
})

const options = ref([]);
const optionsValue = ref([]);
const setOptions = debounce(()=>{
    let _options = [];
    let _optionsValue = []
    if (props.options?.length > 0) {
        _options = props.options
    }
    //  最终取 data 里的options
    if (props.data?.options?.length > 0) {
        _options = props.data?.options
    }
    _optionsValue = _options?.map(item=>item.value)
    optionsValue.value = _optionsValue;
    options.value = _options;
},100)
setOptions()
 watch([()=>props.options,()=>props.data?.options],()=>{
     setOptions()
 },{
     deep:true,
 })



// data?.isOptionLabelTooltip
const isShowByContentCOM = computed(() => {
    let _isOptionLabelTooltip = true;
    let _data = props.data;
    let _optionLabelWidth = _data?.optionLabelWidth;

    // console.log('isShowByContentCOM',_optionLabelWidth)

    // if(_optionLabelWidth){
    //   console.log('isShowByContentCOM-you')
    //   _isOptionLabelTooltip = true;
    //
    // }else{
    //   _isOptionLabelTooltip = true;
    //   console.log('isShowByContentCOM-no')
    //
    // }

    return _isOptionLabelTooltip;
})


const labelWidthCOM = computed(() => {
    let _data = props.data;
    let _width = '';
    let _optionLabelWidth = _data?.optionLabelWidth;
    let _widthNum = '';
    let _widthUnit = 'px';
    if (_optionLabelWidth?.toString()?.trim()?.indexOf('calc') == 0) {
        _width = _width;
    }

    _widthNum = parseFloat(_optionLabelWidth);
    if ((_width || _width == 0) && _widthNum >= 0) {
        // console.log('labelWidthCOM-_width', _width)
        // console.log('labelWidthCOM-parseFloat', parseFloat(_optionLabelWidth))
        let _widthArr = _optionLabelWidth.toString().split(_widthNum.toString())
        // console.log('labelWidthCOM-_widthArr', _widthArr)
        _widthUnit = _widthArr?.[1] || 'px';
        _width = _widthNum + _widthUnit;
    }


    return _width


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


const checkboxComponentCOM = computed(() => {
    let _component = 'el-checkbox'
    if (props.data?.isRadioButton) {
        _component = 'el-checkbox-button'
    } else {

    }

    return _component;
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
const time = dayjs().format('YYYY-MM-DD')
// console.log(time)
const trueLabel = `${time}-true`
const isCheckAll = ref(false)
const isIndeterminate = ref(false)
const changeAll = (data)=> {

    // console.log('isCheckAll',isCheckAll.value);
    // console.log('checkboxALl',checkboxALl.value);
    // const _isCheckAll = isCheckAll.value;

    modelValue.value = isCheckAll.value ? optionsValue.value : []
    isIndeterminate.value = false;

}
const change = (data)=>{
    const _modelValue = modelValue.value;
    const _options = options.value;
    // console.log('modelValue',_modelValue)
    isIndeterminate.value = false;
    isCheckAll.value = false
    if(_modelValue && _modelValue?.length>0){
        isIndeterminate.value = true;
        const mius = _options.filter(item=>_modelValue?.indexOf(item.value) == -1)
        // console.log('mius',mius)
        if(mius && mius.length === 0){
            isIndeterminate.value = false;
            isCheckAll.value = true
        }

    }else{

    }

}
change();

const goTo = (key, data) => {
    console.log('key-data', key,data)
    if (key === 'changeAll') {
        changeAll(data)
    }
    if (key === 'change') {
        change(data);
    }
}


// 接口请求方法放这
const init = () => {
    //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">


.d-checkbox-box{
    position: relative;
    .d-checkbox-all{
        position: absolute;
    }
    .el-checkbox-place{
        display: inline-flex;
        width:50px;
        margin-right: 32px;
        vertical-align: bottom;
        pointer-events: none;
    }
}

.d-checkbox-group-default {
  //width: 100%;

  :deep(.el-checkbox__label) {
    width: v-bind('labelWidthCOM');
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
  }

}
</style>