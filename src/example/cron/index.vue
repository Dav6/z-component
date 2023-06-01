<!--
  author: 戴伟
  date: 019 2022/12/19 09:14:02
  file: src\example\dialog\index.vue
  des:
    do.....
-->

<template>

    <div>
        <d-cron v-model="cronData"></d-cron>

        <d-el-button @click="goTo('confirm')">确定</d-el-button>
    </div>


</template>

<script setup>
defineOptions({
    name: "cron",
    key: 'example-cron',
    isExposed: false
});
import {ref, reactive, computed, watch} from "vue"

const props = defineProps({
    // 配合emits v-model
    modelValue: {
        type: [String, Boolean],
    },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

const defaultCOM = computed(() => {
    return '';
});

const isShow = ref(false)
const cronData = ref('1/2 1/6 * * * ? *');


const goTo = (key, data) => {
    if (key === 'confirm') {
        console.log(cronData)
    }
    if (key == 'show') {
        isShow.value = true;
    }
    if (key == 'cancel') {
        isShow.value = false;
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