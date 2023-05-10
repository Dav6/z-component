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
  <el-menu
      class="menu-model"
      ref="menuModelRef"
      :default-active="modelValue"
      @open="goTo('open','')"
      @close="goTo('close','')"
  >
    <d-menu-list  :list="list"  @onClick="data=>goTo('onClick',data)"  ></d-menu-list>
  </el-menu>
</template>

<script setup>
defineOptions({
    name: 'd-menu-model',
});

import {ref, reactive, computed, watch} from "vue"
import MenuList from "./menuList/index.vue"


const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String],
  },
  list:{
    type: [Array]
  }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onClick']);

const active  = ref('');

const menuModelRef = ref('')



const goTo = (key,data)=>{
  // console.log(key,data)
  if(key == 'onClick'){
    console.log('menuModelRef',menuModelRef.value)
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
.menu-model{
  width: 100%;
  border:0;
  padding:24px 0 24px 24px;
  min-height: 100%;
  border-radius: 0px 24px 24px 0px;
  //height: 100%;


  :deep(.menu-model-item) {
    --el-menu-item-height: 48px;
    --el-menu-sub-item-height: 48px;
    --el-menu-text-color: #6C6E73;
    --el-menu-item-font-size: 16px;
    --el-menu-active-color: var(--el-color-primary);
    --el-transition: all .33s ease-in-out;
    width: 100%;

    //:deep(.el-menu){
    //  width:100%;
    //}
    .el-sub-menu__icon-arrow {
      z-index: 10;

      svg {
        transform: rotateZ(-90deg);
        width: 1.2em;
        height: 1.2em;
      }
    }

    &.is-opened {
      .el-sub-menu__icon-arrow {
        z-index: 10;

        svg {
          transform: rotateZ(-180deg);
        }
      }
    }




  }
  :deep(.menu-model-item) {
    //font-size: 16px;
    //font-family: PingFangSC-Regular, PingFang SC;
    //font-weight: 400;
    position: relative;
    border-radius: 12px;
    --el-menu-text-color: #6C6E73;
    width: 100%;
    min-width: 0;
    max-width: 100%;

    .menu-model-item-text {
      position: relative;
      z-index: 5;
    }
  }

  >:deep(.menu-model-item) {
    .menu-model-item-box{
      width: 100%;
    }
    .el-sub-menu__title,.menu-model-item-box {
      border-radius: 12px;

      .menu-model-sub-text {
        position: relative;
        z-index: 10;
      }

      &:before {
        content: " ";
        display: block;
        height: 100%;
        position: absolute;
        left: -24px;
        top: 0;
        bottom: 0;
        background: var(--el-color-primary);
        box-shadow: 0px 6px 12px 0px rgba(63, 140, 255, 0.26);
        border-radius: 12px;
        width: 0;
        opacity: 0;
        transition: var(--el-transition);
        z-index: 1;
      }

      &:after {
        content: " ";
        display: block;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0;
        bottom: 0;
        background: var(--el-color-primary);
        box-shadow: 0px 6px 12px 0px rgba(63, 140, 255, 0.26);
        border-radius: 12px;
        width: 0;
        opacity: 0;
        transition: var(--el-transition);
        z-index: 1;

      }


    }

    &.is-active {
      --el-menu-text-color: #fff;
      --el-menu-active-color:#fff;


      .el-sub-menu__title,>.menu-model-item-box {
        &:before {
          width: 4px;
          opacity: 1;

        }

        &:after {
          width: calc(100% + 8px);
          opacity: 1;
        }
      }




    }
  }






}
</style>