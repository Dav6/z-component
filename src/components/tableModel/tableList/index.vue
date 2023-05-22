<!--
  author: 戴伟
  date: 021 2022/11/21 16:54:34
  file: src\components\formModel\formIList\index.vue
  des:
    do.....
-->

<template>
  <template v-for="(item,index) in keyList" :key="item.$key">

    <d-table-item
        :tableModelRef="tableModelRef"
        :item="item"
        :pageData="pageData"
        :settingsButtonList="settingsButtonList"
        @onSettingsButtonClick="(data)=>goTo('onSettingsButtonClick',data)"
        @onSwitchChange="(data) =>  goTo('onSwitchChange', data) "
        :selectable="selectable"
        :sectionData="sectionData"
        @onSection="data=>goTo('onSection',data)"
        :beforeSwitchChange="beforeSwitchChange"
        :filters="filters?.[item?.key]"
        :filterMethod="filterMethod?.[item?.key]"
        :option="option?.[item?.key]"
    >
      <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
        <slot :name="item.name" :data="data.data"></slot>
      </template>
    </d-table-item>

  </template>
</template>

<script setup>

defineOptions({
  name: 'd-table-list',
  isExposed: false
});

import {ref, reactive, computed, watch, useSlots} from "vue"

let slots = useSlots()
const slotListCOM = computed(() => {
  return () => {
    // const slots1 = useSlots()
    let _slots = [];
    // console.log('slots1', slots1, Object.keys(slots1))
    // console.log('useSlots', slots, Object.keys(slots))
    _slots = Object.keys(slots) || [];
    _slots = _slots?.map(item => {
      return {
        name: item,
      }
    })
    // console.log('slots',slots )

    return _slots
  }
})
const props = defineProps({
  tableModelRef:{
    type:[Object,Array],
  },
  // 配合emits v-model
  keyList: {
    type: [Array],
  },
  pageData: {
    type: [Object]
  },
  settingsButtonList: {
    type: [Array]
  },
  selectable: {
    type: [Function]
  },
  sectionData:{
    type:[Object]
  },
  beforeSwitchChange: {
    type: [Function, Boolean],
    default: true,
  },

  filters:{
    type: [Object]
  },
  filterMethod:{
    type: [Object]
  },
  option:{
    type: [Object]
  },

});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onSettingsButtonClick', 'onSwitchChange','onSection']);

// console.log('keyList',props.keyList)
const filtersCOM = computed(()=>{
  return (item)=>{
    let _filters = undefined;
    const _filtersMap = props.filters || {}
    let _item = item;
    // console.log(_item)
    let _key = _item?.key;
    if(_filtersMap?.[_key]){
      _filters = _filtersMap?.[_key]
    }
    console.log('tableList-filtersCOM-filtersMap',_filtersMap)
    console.log('tableList-filtersCOM-_key',_key,_filters)
    // console.log('_key',_key,_filters)
    return _filters
  }

})



const goTo = (key, data) => {
  // console.log('formList',key,data);
  // data = JSON.parse(JSON.stringify(data));
  if(key == 'onSection'){
    emits('onSection',data)
  }

  if (key == 'onSwitchChange') {
    emits('onSwitchChange', data)
  }
  if (key == 'onSettingsButtonClick') {
    emits('onSettingsButtonClick', data)

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
:deep(.isSelect){
  background:red;
}
</style>