
<!--
  author: 戴伟
  date: 017 2022/11/17 15:22:15
  file: src\App.vue
  des:
    do.....
-->

<template>
    <div class="App">
      <el-tabs :tab-position="tabPosition"  class="example-tabs">
        <template v-for="(item,index) in list" :key="index">
          <el-tab-pane  class="example-tab-pane"  :label="item.name"  >

            <component :is="item.component" />
          </el-tab-pane>

        </template>
      </el-tabs>
    </div>
</template>

<script setup>
import {ref,reactive,markRaw,computed,watch} from  "vue"

import dayjs from 'dayjs'

const files = import.meta.glob('./example/**/index.vue',{eager:true} )

console.log('app-files',files)
const tabPosition = ref('left')

const list = markRaw([])
Object.keys(files)?.map((key,index)=>{
  console.log(files[key])
  let _item  =files[key]?.default;
  if(_item?.key){
    let _data = {
      key:_item.key,
      name:_item.name,
      component:_item
    }
    list.push(_data)
  }

})
console.log(list)



const props = defineProps({
  // 配合emits v-model
  modelValue: {
    type: [String,Boolean],
  },
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits([]);

const defaultCOM = computed(() => {
  return '';
});



// const _list = new Array(100).fill({});
//
// const list = ref(_list)






// 接口请求方法放这
const init = ()=>{
  //getList();

}

// 统一执行初始化方法
init();








</script>

<style scoped lang="less">


.App{
  box-sizing: border-box;
  padding: 24px;
  width:100vw;
  height: 100vh;
  overflow:hidden;
  position: fixed;
  top:0;
  left:0;
  :deep(.example-tabs){
    height:100%;

    .el-tabs__nav-scroll{
      width:100px;

      overflow-y: auto;
      /*//滚动条的宽度*/
      &::-webkit-scrollbar {
        width: 0px !important;
        height: 0px;
      }

      /*//滚动条的滑块*/
      &::-webkit-scrollbar-thumb {
        background-color: rgba(144, 147, 153, 0.3);
        border-radius: 3px;
      }
    }


    .el-tabs__content{
      height:100%;
      //width:100%;
      overflow-y: auto;

    }

    .example-tab-pane{

      //height:300vh;
      //background:blue;
    }


  }
}

</style>