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
      :selectable="(row, index) => selectable(row,index)"
      :prop="item.key"

      :column-key="item.key"
      :filters="filtersCOM"
      :filter-method="item?.filterMethod || filterMethod || undefined"
      :filtered-value="filteredValueCOM"
      :filter-multiple="filterMultipleCOM"
      :filter-placement="filterPlacementCOM"

      :sortable="sortableCOM"
      :sort-method="item?.sortMethod || undefined"
      :sort-orders="sortOrdersCOM"
      :sort-by="item?.sortBy"



  >

    <template v-if="isShowSelectionHeader" #header>

      <div class="el-table-section-header">
        <div class="el-table-section-header-left">
          <div class="el-table-section-header-section">已选中 <span>{{sectionNum}}</span> 项</div>
          <d-el-button  class="el-table-section-header-btn-default" text icon="Delete" @click="goTo('sectionDelete')">删除</d-el-button>
        </div>
        <div class="el-table-section-header-right">
          <d-el-button  class="el-table-section-header-btn-default" text @click="goTo('sectionClear')" >取消选择</d-el-button>

        </div>
      </div>
    </template>


    <template v-if="item.isShow" #default="scope">
      <template v-if="item.type == 'index'">
        {{ getIndex(scope) }}
      </template>
      <template v-else-if="item.type == 'expand'">
        <slot :name="item.type" :data="scope"></slot>
      </template>

      <template v-else-if="item.type == 'settings'">

        <el-button-group class="settings-group">
          <template v-for="(bItem,bIndex) in item.buttonList" :key="bIndex">

            <Component
                :is="settingsButtonItemCOM(bItem)"
                :text="bItem.type=='button'"
                :list="bItem.list"
                :trigger="bItem.trigger"
                :placement="bItem.placement"
                @click="goTo('settingsButtonClick',{scope:scope,keyItem:item,settingItem:bItem,settingIndex:bIndex})"
                @command="(key)=>goTo('settingsDropdownClick', {scope:scope,keyItem:item,settingItem:bItem,settingIndex:bIndex,dropdownItemKey:key})"
            >

              <template v-if="bItem.type == 'dropdown'">
                <d-el-button text class="settings-dropdown-button">{{ bItem.name ? bItem.name : '···' }}</d-el-button>
              </template>
              <template v-if="bItem.type =='button' ">
                {{ bItem.name }}
              </template>
            </Component>
            <template v-if="item.divided  && (item.buttonList?.length - 1 != bIndex)">
              <div class="settings-group-divided"></div>
            </template>

          </template>

        </el-button-group>
      </template>

      <template v-else-if="item.type == 'switch'">
        <Component
            :is="'d-el-switch'"
            v-model="scope.row[item.key]"
            :disabled="item?.disabled"
            :loading="item?.loading"
            :size="item?.size"
            :width="item?.width"
            :inline-prompt="item?.inlinePrompt"
            :active-icon="item?.activeIcon"
            :inactive-icon="item?.inactiveIcon"
            :active-text="item?.activeText"
            :inactive-text="item?.inactiveText"
            :active-value="item?.activeValue"
            :inactive-value="item?.inactiveValue"
            :name="item?.name"
            :before-change="data => beforeSwitchChangeFN({ data:scope ,value:data })"
            @change="(data) => { goTo('onSwitchChange', { data:scope ,value:data }) }"
        ></Component>
      </template>
      <template v-else-if="item.type == 'time'">
        {{ timeFormatCOM(scope.row[item.key]) }}
      </template>

      <template v-else-if="item.type == 'image'">
        <!--        {{ scope.row[item.key] }}-->
        <!--        {{scope.row[item.key]}}-->
        <div class="image-list">
          <template v-for="(cItem,cIndex) in imageCOM('list',{scope,keyItem:item})" :key="cItem">

            <d-el-image
                class="image-item"
                :src="cItem"
                :size="imageCOM('size',{scope,keyItem:item,data:cItem})"
                :previewList="imageCOM('previewList',{scope,keyItem:item,data:cItem})"
                :previewTeleported="imageCOM('previewTeleported',{scope,keyItem:item,data:cItem})">

            </d-el-image>
          </template>

        </div>


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


defineOptions({
  name: 'd-table-item',
  isExposed: false
});

import {ref, reactive, computed, watch, onBeforeUnmount, shallowRef, onMounted, nextTick, useAttrs, useSlots} from "vue"

// import WangEditor from "@/components/wangEditor/index"

// import {isSameObj} from "@/utils/tools"
// import tools from "@/index"
import dayjs from "dayjs";

// console.log(tools.debounce)

const props = defineProps({
  tableModelRef:{
    type:[Object,Array],
  },
  item: {
    type: [Object],
    default: {
      label: "",
      format: 'YYYY-MM-DD HH:mm:ss',
      type: '',//expand / selection / index / settings / time
      width: "",
    }
  },
  pageData: {
    type: [Object]
  },
  selectable: {
    type: [Function]
  },
  sectionData:{
    type:[Object]
  },
  beforeSwitchChange:{
    type:[Function,Boolean],
    default:true,
  },

  filters:{
    type:[Array]
  },
  filterMethod:{
    type: [Function]
  }
});
//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onSettingsButtonClick', 'onChange','onSwitchChange','sectionDelete']);


// console.log(props.item)



//  section sortable 排序开启
const sortableCOM = computed(()=>{
  let _sortable = false;
  let _item = props?.item;
  let _itemSortable = _item?.sortable;
  if(_itemSortable){
    _sortable = _itemSortable
  }

  return _sortable;
})
// 指定数据按照哪个属性进行排序，仅当sortable设置为true的时候有效。
// 应该如同 Array.sort 那样返回一个 Number  a-b b-a
// const sortMethod= (a, b)=>{
//   let _sortMethod = undefined;
//   let _item = props?.item;
//   let _itemSortMethod = _item?.sortMethod;
//
//
//   // console.log('typeof(_itemSortMethod)',typeof(_itemSortMethod))
//   if( typeof(_itemSortMethod) == 'function'){
//     return  _itemSortMethod(a,b)
//   }
//
//   return _sortMethod
// }

// 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。
// 如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推
const sortBy = (row, index) =>{
  console.log(row,index)
  return row.recordId
}

const sortOrdersCOM = computed(()=>{
  let _sortOrders = ['ascending', 'descending', null];
  let _item = props?.item;
  let _itemSortable = _item?.sortOrders;

  if(Array.isArray(_itemSortable) && _itemSortable?.length>=0){
    _sortOrders = _itemSortable
  }

  return _sortOrders

})







// section filterMethod
// 数据过滤使用的方法， 如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
// const filterMethod = (value, row, column)=>{
//   console.log('filterMethod',value,row,column)
//   return undefined;
// }

//  过滤条件
const filtersCOM = computed(()=>{
  let _filters = undefined;
  let _propFilters = props?.filters;
  let _item = props?.item;
  let _itemFilters = _item?.filters;
  if(Array.isArray(_propFilters) && _propFilters?.length>=0){
    _filters = _propFilters
  }
  if(Array.isArray(_itemFilters) && _itemFilters?.length>=0){
    _filters = _itemFilters
  }

  // console.log('_filters',_filters)
  return _filters;
})

// section 数据过滤的选项是否多选
const filterMultipleCOM = computed(()=>{
  let _filterMultiple = false;
  let _propFilters = props?.filters;
  let _item = props?.item;
  let _itemFilterMultiple = _item?.filterMultiple;
  if(_itemFilterMultiple === true){
    _filterMultiple = true
  }


  return _filterMultiple;
})


// 过滤条件 默认勾选值 根据 value
const filteredValueCOM = computed(()=>{
  let _filteredValue = []

  return _filteredValue;
})

// section 过滤弹出框的定位
const filterPlacementCOM = computed(()=>{
  let _filterPlacement = 'bottom'
  return _filterPlacement
})





// console.log('sectionData',props.sectionData)
const isShowSelectionHeader = ref(false)
const sectionNum = ref(0)
// section watch sectionData
watch(()=>props.sectionData,(sectionData,preSectionData)=>{
  // console.log('sectionData',sectionData)
  const _sectionData = sectionData;

  if(_sectionData.selection?.length>0){
    isShowSelectionHeader.value = true;
    sectionNum.value = _sectionData.selection?.length
  }else{
    isShowSelectionHeader.value = false;
    sectionNum.value = 0

  }

},{
  deep:true
})





const beforeSwitchChangeFN = (data)=>{
  let _beforeSwitchChange = props.beforeSwitchChange;
  console.log('beforeSwitchChangeFN')
  if(typeof(_beforeSwitchChange) == 'function'){
    return _beforeSwitchChange(data)
  }else{
    return _beforeSwitchChange
  }

}

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
  if (props.pageData && props.pageData?.page) {
    let _pageData = props.pageData;
    return _index + (_pageData?.page - 1) * _pageData?.pageSize
  } else {
    return _index;
  }
}


const settingsButtonItemCOM = computed(() => {
  return (data) => {
    // console.log(data);
    let _settingsButtonItem = data;
    let _component = 'd-el-button'
    if (_settingsButtonItem.type == 'dropdown') {
      _component = 'd-el-dropdown';
    }
    return _component
  }
})


const imageCOM = computed(() => {
  return (key, data) => {
    // console.log('imageCOM',key,data)
    let _keyItem = data?.keyItem;
    let _scope = data?.scope;
    let _result = '';

    if (!_scope?.row[_keyItem?.key]) return '';

    switch (key) {

      case 'previewList':
      case 'list':
        let _limit = _keyItem?.limit || 1;
        _result = [];
        // _result = _scope?.row[_keyItem?.key];
        let _data = _scope?.row[_keyItem?.key]
        if (_data && Array.isArray(_data)) {
          _result = _data;
        }
        if (_data && !Array.isArray(_data)) {
          _result = [_data];
        }
        if (key == 'list') {
          _result = _result?.filter((item, index) => index < _limit)
        }


        // console.log(key,_result);

        break;
      case 'size':
        _result = _keyItem?.size || '80 80';
        break;
      case 'previewTeleported':
        _result = _keyItem?.previewTeleported == false ? _keyItem?.previewTeleported : true;

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


const selectable = (row, index) => {
  // console.log(props.item)
  // console.log(row,index)


  if (props.selectable) {
    // console.log(props.selectable(row,index))
    return !props.selectable(row, index)
  }

  if (row.selectable) {
    return false;
  }

  return true
}


//section goTo
const goTo = (key, data) => {
  console.log(key, data);

  if(key == 'sectionDelete' || key == 'sectionClear'){

    console.log(props.sectionData)
    let _selection = props.sectionData?.selection  || []
    emits('sectionDelete',{selection:_selection})


    if(key == 'sectionClear'){
      const _tableModelRef = props.tableModelRef
      _tableModelRef?.clearSelection()
    }
  }

  // let _data = JSON.parse(JSON.stringify(data,(key,value)=>{
  //   console.log(key,value)
  //   if (typeof value === 'object' && value !== null) {
  //
  //     return
  //   }
  //   return value;
  // }));

  if(key == 'onSwitchChange' ){
    emits('onSwitchChange',{...data})

  }



  if (key == 'settingsButtonClick' || key == 'settingsDropdownClick') {

    // data:scope.row,dataIndex:scope.$index,
    let _data = data?.scope?.row;
    let _dataIndex = data?.scope?.$index;
    let _settingItem = data?.settingItem;
    let _buttonKey = _settingItem?.key;
    let _dropdownIndex = ''
    if (_settingItem?.type == 'dropdown') {
      _buttonKey = data?.dropdownItemKey;
      _dropdownIndex = _settingItem?.list?.findIndex(item => item.key == _buttonKey)
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

.el-table-section-header{
  height:100%;
  display:flex;
  align-items:center;
  justify-content: space-between;
  .el-table-section-header-left{
    height:100%;
    display:flex;
    align-items:center;
    justify-content: space-between;
    .el-table-section-header-section{
      padding-right: 50px;
      span{
        color: #4886FF;
      }
    }

  }
  .el-table-section-header-right{
    padding-right:40px;
  }
  .el-table-section-header-btn-default{
    height:100%;
    padding:0;
    display:flex;
    align-items:center;
  }
}


.settings-group {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  > .el-button {
    padding: 8px;
  }

  .settings-dropdown-button {
    padding: 8px;
  }

  .settings-group-divided {
    height: 14px;
    width: 1px;
    background: #E9E9E9;
    //border-left:1px solid #E9E9E9;
  }


}

.image-list {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;

  .image-item {
    margin-right: 8px;
    max-width: 100%;
  }
}


</style>