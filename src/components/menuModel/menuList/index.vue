<!--
  @Author: 戴伟
  @Date: 2023-04-24 15:49:59
  @FilePath: src\views\layout\components\menuModel\index.vue  
  @LastEditTime: ''
  @LastEditors: ''
  @Description: 
        do.....
-->

<template>
    <template v-for="(item,index) in list" :key="index">
        <d-menu-item :item="item" :collapse="collapse" @onClick="data=>goTo('onClick',data)"></d-menu-item>
    </template>
</template>

<script setup>
defineOptions({
    name: 'd-menu-list',
    isExposed: false
});

import {ref, reactive, computed, watch} from "vue"

import MenuItem from "../menuItem/index.vue"

const props = defineProps({
    // 配合emits v-model
    modelValue: {
        type: [String, Boolean],
    },
    list: {
        type: [Array]
    },
    collapse: {
        type: [Boolean],
    }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onClick']);

const defaultCOM = computed(() => {
    return '';
});

const goTo = (key, data) => {
    // console.log(key,data)
    if (key === 'onClick') {
        emits('onClick', {...data})
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