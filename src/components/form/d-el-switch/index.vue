<!--
  @Author: 戴伟
  @Date: 2023-02-23 15:06:57
  @FilePath: src\components\form\d-el-switch\index.vue
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
-->
<template>
    <el-switch
            class="form-switch"
            v-model="modelValue"
            :disabled="data?.disabled"
            :loading="data?.loading"
            :size="data?.size"
            :width="data?.switchWidth"
            :inline-prompt="data?.inlinePrompt"
            :active-icon="data?.activeIcon"
            :inactive-icon="data?.inactiveIcon"
            :active-text="data?.activeText"
            :inactive-text="data?.inactiveText"
            :active-value="data?.activeValue"
            :inactive-value="data?.inactiveValue"
            :name="data?.name"
            :validate-event="data?.validateEvent"
            :before-change="data?.beforeChange"
            @change="(data)=>goTo('onChange',data)"
            v-bind="$attrs"
    >

    </el-switch>
</template>

<script setup>
defineOptions({
    name: 'd-el-switch',
});
import {ref, reactive, computed, watch, useAttrs} from "vue"


const props = defineProps({
    // 配合emits v-model
    modelValue: {
        type: [String, Number, Boolean],
    },
    data: {
        type: [Object],
    },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(["update:modelValue"]);
const modelValue = computed({ // 重新定义
    get: () => props.modelValue,
    set: (value) => emits("update:modelValue", value),
})

const _attrs = useAttrs();
setTimeout(() => {
    console.log('_attrs------------', _attrs)

}, 100)

const placeholderCOM = computed(() => {
    return (data) => {
        // console.log('placeholderCOM',data);
        if (data?.placeholder) return data?.placeholder;
        let _placeholder = '';
        let _placeholderPrefix = '';
        _placeholderPrefix = '请输入'
        let _name = data?.name || '';
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

const goTo = (key, data) => {
    if (key == 'onChange') {
        // console.log(key,data)
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

</style>