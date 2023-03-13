<!--
  author: 戴伟
  date: 019 2022/12/19 09:14:02
  file: src\example\dialog\index.vue
  des:
    do.....
-->

<template>
  <div class="container-box">

    <!--    <div class="container container-1">-->

    <!--    </div>-->
    <div class="container container-2">


      <div class="tip"></div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "测试",
  key: 'example-test',
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


const cutWidth = ref(45);
const borderWidth = ref(2);
const cutBgWidth = computed(()=>{
  return Math.round(Math.sqrt(Math.pow(cutWidth.value, 2) * 2) /2 - 1)
})
console.log('cutBg', cutBgWidth)
// setTimeout(()=>cutWidth.value = 20,1000)

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
.container-box {
  position: relative;
  padding: 2px;
  background: #999999;
  height: 600px;
}

.container {
  left: 0;
  top: 0;
  width: 60vw;
  height: 30vh;
  background: #fff;
  //clip-path: polygon(0% 0%, 80% 0%, 100% 00%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
  margin: 0 30px 20px;

  //&.container-1 {
  //  width: 104px;
  //  height: 104px;
  //  background: radial-gradient(circle at center center, yellow, yellow),
  //  linear-gradient(45deg, blue, red),
  //  linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left top,
  //  linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right top,
  //  linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right top,
  //  linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left bottom,
  //  linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left bottom,
  //  linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right bottom,
  //  linear-gradient(rgba(179, 224, 255, 1), rgba(179, 224, 255, 1)) right bottom,
  //  linear-gradient(red, red) top,
  //  linear-gradient(red, red) bottom,
  //  linear-gradient(red, red) left,
  //  linear-gradient(red, red) right;
  //
  //  background-repeat: no-repeat;
  //  background-position: 1px 1px, 0px 0px, 0px 0px, 0px 100%, 0px 100%, 100% 0px, 100% 0px, 100% 100%, 100% 100%, 0px 0px, 0px 100%, 0px 100%, 100% 100%;
  //  background-size: calc(100% - 2px) calc(100% - 2px), 1px 10px, 10px 1px, 1px 10px, 10px 1px, 1px 10px, 10px 1px, 1px 10px, 10px 1px, 100% 1px, 100% 1px, 1px 100%, 1px 100%;
  //
  //
  //}


  &.container-2 {
    //sqrt
    position: relative;
    --cut-width: v-bind(cutWidth+'px');
    --boder-width: v-bind(borderWidth+'px');
    --cut-bg-width: v-bind(cutBgWidth+'px');
    width: 50%;
    height: 60%;

    clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--cut-width)), calc(100% - var(--cut-width)) 100%, calc(var(--cut-width)) 100%, 0 calc(100% - var(--cut-width)));
    //background: ;
    background: linear-gradient(-45deg, rgba(65, 140, 251, 0) calc(var(--cut-bg-width) * 0.3), rgba(65, 140, 251, 1) var(--cut-bg-width), transparent 0) bottom right,
    linear-gradient(45deg, rgba(65, 140, 251, 0) calc(var(--cut-bg-width) * 0.3), rgba(65, 140, 251, 1) var(--cut-bg-width), transparent 0) bottom left,
    linear-gradient(180deg, rgba(5, 88, 148, 0) 0%, rgba(5, 88, 148, 0.27) 80%);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: var(--boder-width) solid;
    border-image: linear-gradient(180deg, rgba(65, 140, 251, 0) 20%, rgba(65, 140, 251, 1)) 2 2;

    .tip {
      position: absolute;
      background: black;
      width: calc(sqrt(600px));
      height: var(--cut-width);
      right: 50%;
      bottom: 0;
    }
  }

}
</style>