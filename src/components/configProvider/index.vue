<!--
  author: 戴伟
  date: 023 2022/11/23 14:29:17
  file: src\components\configProvider\index.vue
  des:
    do.....
-->

<template>
  <el-config-provider v-bind="elConfig" :locale="locale">
    <slot></slot>
  </el-config-provider>
</template>

<script setup>
defineOptions({
  name: 'd-el-config-provider',
  isExposed: false
});
import {ref, reactive, computed, watch, inject} from "vue"
import {EL_CONFIG} from "@/injection/keys";

// console.log(FormItem)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'


const config = inject(EL_CONFIG)
console.log('config', config)

const locale = true ? zhCn : en
// import "dayjs/locale/zh-cn";
const elConfig = ref({
  locale,
  size: 'default',
  zIndex: 2888,
  ...config
})

console.log('elConfig', elConfig.value)

// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

</style>