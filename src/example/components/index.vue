<!--
  author: 戴伟
  date: 019 2022/12/19 09:14:02
  file: src\example\dialog\index.vue
  des:
    do.....
-->

<template>
  <div class="container-box">
    <div class="tooltip">
      <d-el-tooltip   style="width:5em" content="123123" placement="bottom-start" :isShowByContent="false"  >
        {{tooltipText}}
      </d-el-tooltip>
    </div>
    <div class="tooltip"    >
      <d-el-tooltip  content="123123"  placement="top-start" :isShowByContent="true"  >
        {{tooltipText}}
      </d-el-tooltip>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "各种组件",
  key: 'example-components',
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


const tooltipText = ref('我是测试文案测试文案测试文案测试文案')


const goTo = (key, data) => {
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

.container-box{
  padding-top:100px;
}

</style>