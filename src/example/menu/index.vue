<!--
  author: 戴伟
  date: 019 2022/12/19 09:14:02
  file: src\example\dialog\index.vue
  des:
    do.....
-->

<template>
  <div class="container-box">
      <d-menu-model v-model="active" :list="list"
                  @onClick="data=>goTo('onClick',data)"
      ></d-menu-model>

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

const active = ref('')


const list =   Array(5).fill({})?.map((item, index) => {
    const _item = {}

    _item.title =  `测试${index}`
    _item.index = `${index}`

    _item.children = []
    if(index == 0 || index == 2 ){
        _item.children =   Array(3).fill({})?.map((cItem, cIndex) => {
            const _cItem = {}

            _cItem.title =  `测试${index}-${cIndex}`
            _cItem.index = `${index}-${cIndex}`





            return _cItem;
        })
    }



    return _item;
})





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

  width:300px;
  border: 1px solid red;
}


</style>