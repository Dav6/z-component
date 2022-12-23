<!--
  author: 戴伟
  date: 017 2022/11/17 16:08:07
  file: src\components\formModel\formItem\index.vue
  des:
    do.....
-->

<template>
  <el-table-column
    :label="item.label"
    :type="item.type"
    :width="item.width"
    :align="item.align"
    :fixed="item.fixed"
    :show-overflow-tooltip="item.showOverflowTooltip"

  >


    <template v-if="item.isShow" #default="scope">
      <template v-if="item.type == 'index'">
        {{ getIndex(scope) }}
      </template>
      <template v-else-if="item.type == 'expand'">
        <slot :name="item.type" :data="scope"></slot>
      </template>

      <template v-else-if="item.type == 'settings'">

        <el-button-group class="settings-group">
          <template v-for="(bItem,bIndex) in settingsButtonList" :key="bIndex">


            <Component
              :is="settingsButtonItemCOM(bItem)"
              :text="bItem.type=='button'"
              :list="bItem.list"
              :trigger="bItem.trigger"
              @click="goTo('settingsButtonClick',{scope:scope,keyItem:item,settingItem:bItem,settingIndex:bIndex})"
              @command="(key)=>goTo('settingsDropdownClick', {scope:scope,keyItem:item,settingItem:bItem,settingIndex:bIndex,dropdownItemKey:key})"
            >
              <template v-if="bItem.type=='button'">
                {{ bItem.name }}
              </template>
              <template v-else-if="bItem.type == 'dropdown'">
                <d-el-button text class="settings-dropdown-button">{{ bItem.name?bItem.name:'···' }} </d-el-button>
              </template>
            </Component>




          </template>

        </el-button-group>
      </template>

      <template v-else-if="item.type == 'time'">
        {{ timeFormatCOM(scope.row[item.key]) }}
      </template>

      <template v-else-if="item.type == 'image'">
<!--        {{ scope.row[item.key] }}-->
<!--        {{scope.row[item.key]}}-->

        <template v-for="(cItem,cIndex) in imageCOM('list',{scope,keyItem:item})" :key="cItem">

          <d-el-image
            class="image-item"
            :src="cItem"
            :size="imageCOM('size',{scope,keyItem:item,data:cItem})"
            :previewList="imageCOM('previewList',{scope,keyItem:item,data:cItem})"
            :previewTeleported="imageCOM('previewTeleported',{scope,keyItem:item,data:cItem})">

          </d-el-image>
        </template>




      </template>


      <template v-else-if="item.type == 'custom'">
        <slot :name="item.customName" :data="scope"></slot>
      </template>

      <template v-else>
        {{ scope.row[item.key] }}
      </template>
    </template>


  </el-table-column>

</template>

<script setup>

// import re from "../../../../dist/zr-component.es";

defineOptions({
  name: 'd-table-item',
  isExposed: false
});

import {ref, reactive, computed, watch, onBeforeUnmount, shallowRef, onMounted, nextTick, useSlots} from "vue"


// import WangEditor from "@/components/wangEditor/index"

// import {isSameObj} from "@/utils/tools"
// import tools from "@/index"
import dayjs from "dayjs";

// console.log(tools.debounce)

const props = defineProps({
  // 配合emits v-model
  item: {
    type: [Object],
    default: {
      format: 'YYYY-MM-DD HH:mm:ss',
      type: '',//expand / selection / index / settings / time
    }
  },
  settingsButtonList: {
    type: [Array]
  },
  pageData: {
    type: [Object]
  }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onSettingsButtonClick', 'onChange']);


const formatItem = (item = {}) => {
  let _item = item;
  let _type = _item?.type
  let _isShow = true;
  if (_type == 'selection') {
    _isShow = false;
  }
  item.isShow = _isShow;
}


watch(() => props.item, (item, preItem) => {
  // console.log('tableItem-watch-item',item);
  formatItem(item);


}, {
  deep: true,
  immediate: true,
})


const timeFormatCOM = computed(() => {
  return (time) => {
    // console.log(time);
    let _time = time;
    let _item = props.item;
    let _format = _item?.format || 'YYYY-MM-DD HH:mm:ss'
    _time = dayjs(_time).format(_format);
    return _time;
  }

})


const getIndex = (data) => {
  // console.log(data,props.pageData);
  let _index = data?.$index || 0;

  // console.log(ind,props.pageData);
  _index = _index + 1;
  if (props.pageData) {
    let _pageData = props.pageData;
    return _index + (_pageData?.page - 1) * _pageData?.pageSize
  } else {
    return _index;
  }
}



const settingsButtonItemCOM = computed(()=>{
  return (data)=>{
    // console.log(data);
    let _settingsButtonItem = data;
    let _component = 'd-el-button'
    if(_settingsButtonItem.type == 'dropdown'){
      _component = 'd-el-dropdown';
    }
    return _component
  }
})


const imageCOM = computed(()=>{
  return (key,data)=>{
    // console.log(key,data)
    let _keyItem = data?.keyItem;
    let _scope = data?.scope;
    let _result = '';

    switch(key){

      case 'previewList':
      case 'list':
        _result = [];
        _result = _scope?.row[_keyItem?.key] || '';
         if(!Array.isArray(_result)){
           _result = [_result];
         }

        // console.log(key,_result);

        break;
      case 'size':
        _result = _keyItem?.size || '80 80';
        break;
      case 'previewTeleported':
        _result = _keyItem?.previewTeleported == false?_keyItem?.previewTeleported:true;

        break;
      default:
        break;
    }
    //
    // if(key == 'src'){
    //   _result = _scope?.row[_item?.key] || '';
    //  if(Array.isArray(_result)){
    //
    //  }
    //
    // }

    // console.log('_result',_result)

    return _result;
  }
})



//section goTo
const goTo = (key, data) => {
  console.log(key, data);
  // let _data = JSON.parse(JSON.stringify(data,(key,value)=>{
  //   console.log(key,value)
  //   if (typeof value === 'object' && value !== null) {
  //
  //     return
  //   }
  //   return value;
  // }));
  if (key == 'settingsButtonClick' || key == 'settingsDropdownClick') {

    // data:scope.row,dataIndex:scope.$index,
    let _data = data?.scope?.row;
    let _dataIndex = data?.scope?.$index;
    let _settingItem = data?.settingItem;
    let _buttonKey = _settingItem?.key;
    let _dropdownIndex = ''
    if(_settingItem?.type == 'dropdown'){
      _buttonKey = data?.dropdownItemKey;
      _dropdownIndex = _settingItem?.list?.findIndex(item=>item.key == _buttonKey)
      // console.log(_dropdownIndex);
    }


    let _emitsData = {
      ...data,
      data: _data,
      dataIndex: _dataIndex,
      buttonKey: _buttonKey,
    }

    emits('onSettingsButtonClick', _emitsData)
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

.settings-group {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > .el-button {
    padding: 8px;
  }

  .settings-dropdown-button{
    padding: 8px;
  }
}


.image-item{
  margin-right: 8px;
}

</style>