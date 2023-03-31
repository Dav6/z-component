
<!--
  author: 戴伟
  date: 020 2022/12/20 11:28:56
  file: src\components\eles\d-el-table\index.vue
  des:
    do.....
-->

<template>
  <el-dropdown
    :trigger="trigger"
    :placement="placement"
    v-bind="$props"
  >
    <slot></slot>

    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="(item,index) in list" :key="index">
          <el-dropdown-item
            :command="item.key" :disabled="item.disabled"
            :divided="item.divided"
          >{{ item.name }}</el-dropdown-item>

        </template>

      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>

<script setup>
defineOptions({
  name: 'd-el-dropdown',
});
// import {ref,reactive,computed,watch} from  "vue"

const props = defineProps({
  // 配合emits v-model
  list: {
    type: [Array],
  },
  trigger:{
    type:[String]
  },
  placement:{
    type:[String]
  }

});



//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);






const goTo = (key,data)=>{
  console.log(key,data);
}










// 接口请求方法放这
const init = ()=>{
  //getList();

}

// 统一执行初始化方法
init();








</script>

<style scoped lang="less">

</style>