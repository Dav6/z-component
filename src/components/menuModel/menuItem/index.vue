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
    <template v-if="item?.children?.length>0">
        <el-sub-menu class="menu-model-sub menu-model-item" :index="item?.index">
            <template #title>
                <!--          <el-icon><location /></el-icon>-->
                <div class="menu-item-icon zr-iconfont " :class="[item.icon]">
                    {{collapse?(item.icon?'':item?.title?.[0])  :''}}
                </div>
                <div class="menu-model-sub-text">{{ item?.title }}</div>
            </template>
            <d-menu-list :list="item.children" @onClick="data=>goTo('onClick',data)"></d-menu-list>
        </el-sub-menu>

    </template>
    <template v-else>
        <el-menu-item
                class="menu-model-item"
                @click="data=>goTo('onClick',{menuItem:data,data:item})"
                :index="item?.index"
        >
            <div class="menu-item-icon zr-iconfont " :class="[item.icon]">
                {{collapse?(item.icon?'':item?.title?.[0])  :''}}
            </div>
            <template #title>
                <div class="menu-model-item-box">
                    <div class="menu-model-item-text">{{ item?.title }}</div>
                </div>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup>
defineOptions({
    name: 'd-menu-item',
    isExposed: false
});
import {ref, reactive, computed, watch} from "vue"
import MenuList from "../menuList/index.vue"


const props = defineProps({
    // 配合emits v-model
    modelValue: {
        type: [String, Boolean],
    },
    item: {
        type: [Object]
    },

    collapse: {
        type: [Boolean],
    }
});
const emits = defineEmits(['onClick']);


const goTo = (key, data) => {
    console.log(key, data)
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

.menu-item-icon{
    font-size:22px;
    padding-right: 8px;
}


</style>