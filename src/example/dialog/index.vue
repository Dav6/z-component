<!--
  author: 戴伟
  date: 019 2022/12/19 09:14:02
  file: src\example\dialog\index.vue
  des:
    do.....
-->

<template>

  <div>
    <el-button @click="goTo('show')">123123</el-button>
  </div>

  <d-el-dialog
    v-model="isShow"
    :before-close="(done)=>goTo('cancel')"
    :title="dialogInfo.title"
  >
    <template #header>
      头部
    </template>
    <div>123123</div>
    <div>4444</div>
    <template #footer >
      腿部
    </template>
  </d-el-dialog>
</template>

<script setup>
defineOptions({
  name: "弹窗dialog",
  key: 'example-dialog',
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
const dialogInfo = reactive({
  title: '标题'
})


const goTo = (key,data)=>{
  if (key == 'show'){
    isShow.value = true;
  }
  if(key == 'cancel'){
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