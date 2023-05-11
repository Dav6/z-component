<!--
  author: 戴伟
  date: 019 2022/12/19 09:14:02
  file: src\example\dialog\index.vue
  des:
    do.....
-->

<template>
  <div class="container-box">
      <div class="container-box-menu">
          <d-menu-model v-model="active" :list="list"
                        @onClick="data=>goTo('onClick',data)"
          ></d-menu-model>
      </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "侧边栏",
  key: 'example-menu',
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

const active = ref('1')

const list = ref([]);

const setList = (list,parent,level=1)=>{
    const _level = level;
    // console.log('level',level)
    if(_level>3){
        return [];
    }
    const _list = list?.map((item, index) => {
        const _item = {}

        _item.title =   parent?.index ?`测试 ${parent.index}-${index}`:`测试 ${index}`;
        _item.index = parent?.index ?`${parent.index}-${index}`:`${index}`;

        _item.children = []
        if(index == 0 || index == 2 ){
            _item.children =  setList(Array(3).fill({}),_item,_level+1)
        }

        return _item;
    })

    return _list
}

list.value = setList(Array(5).fill({}))
console.log('list',setList(Array(5).fill({})))



// const list =   Array(5).fill({})?.map((item, index) => {
//     const _item = {}
//
//     _item.title =  `测试${index}`
//     _item.index = `${index}`
//
//     _item.children = []
//     if(index == 0 || index == 2 ){
//         _item.children =   Array(3).fill({})?.map((cItem, cIndex) => {
//             const _cItem = {}
//
//             _cItem.title =  `测试${index}-${cIndex}`
//             _cItem.index = `${index}-${cIndex}`
//             if(cIndex == 0 || cIndex == 2 ){
//                 _item.children =   Array(3).fill({})?.map((cItem, cIndex) => {
//                     const _cItem = {}
//
//                     _cItem.title =  `测试${index}-${cIndex}`
//                     _cItem.index = `${index}-${cIndex}`
//
//
//                     return _cItem;
//                 })
//             }
//
//
//
//             return _cItem;
//         })
//     }
//
//
//
//     return _item;
// })





const goTo = (key, data) => {
    console.log(key ,data);
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
  height: 600px;

  background: red;
  width:100%;
  border: 1px solid red;
  .container-box-menu{
    width:300px;

  }
}


</style>