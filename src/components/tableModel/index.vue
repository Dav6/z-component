<!--
  author: 戴伟
  date: 020 2022/12/20 11:28:56
  file: src\components\eles\d-el-table\index.vue
  des:
    do.....
-->

<template>
  <el-table
    :data="list"
    v-bind="$props"
  >

    <d-table-list
      :keyList="keyListCOM"
      :settingsButtonList="settingsButtonList"
      @onSettingsButtonClick="(data)=>goTo('onSettingsButtonClick',data)"
    >

      <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
        <slot :name="item.name" :data="data.data"></slot>
      </template>

    </d-table-list>

    <!--    <el-table-column type="selection" fixed="left" width="60" align="center"></el-table-column>-->
    <!--    <el-table-column type="index" :index="getIndex" label="序号"  :show-overflow-tooltip="true" width="60" align="center">-->
    <!--      <template #default="scope">-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <!--    <template v-for="(item,index) in keyList" :key="index">-->

    <!--      <el-table-column :label="item.name" :type="item.type" :width="item.width" :show-overflow-tooltip="item.showOverflowTooltip">-->
    <!--        <template #default="scope">-->
    <!--          {{ scope.row[item.key] }}-->
    <!--        </template>-->
    <!--      </el-table-column>-->

    <!--    </template>-->

    <!--    <el-table-column-->
    <!--      label="操作"-->
    <!--      fixed="right"-->
    <!--    >-->
    <!--      <template #default="scope">-->
    <!--        <el-button-group style="width: 100%">-->
    <!--          <el-button-->
    <!--            type="primary"-->
    <!--            text-->
    <!--            @click="goTo('showAttendanceStatisticsDialog',scope.row)"-->
    <!--          >查看-->
    <!--          </el-button>-->
    <!--          <el-button-->
    <!--            type="primary"-->
    <!--            text-->
    <!--            @click="goTo('showAttendanceStatisticsDialog',scope.row)"-->
    <!--          >查看-->
    <!--          </el-button>-->
    <!--        </el-button-group>-->

    <!--      </template>-->

    <!--    </el-table-column>-->

  </el-table>

</template>

<script setup>
defineOptions({
  name: 'd-table-model',
});
import {ref, reactive, computed, watch, useSlots} from "vue"


let slots = useSlots()
const slotListCOM = computed(() => {
  return () => {
    // const slots1 = useSlots()
    // console.log(slots )
    let _slots = [];
    // console.log('slots1', slots1, Object.keys(slots1))
    // console.log('useSlots', slots, Object.keys(slots))
    _slots = Object.keys(slots) || [];
    _slots = _slots?.map(item => {
      return {
        name: item,
      }
    })
    // console.log(_slots);
    return _slots
  }
})

const props = defineProps({
  // 配合emits v-model
  list: {
    type: [Array]
  },
  keyList: {
    type: [Array],
    default: []
  },
  pageData: {
    type: [Object],
  },
  isShowIndex: {
    type: [Boolean]
  },
  isShowExpand: {
    type: [Boolean]
  },
  isShowSelection: {
    type: [Boolean]
  },
  isShowSettings: {
    type: [Boolean]
  },
  settingsButtonList: {
    type: [Array]
  }
});


// <!--selection / index / expand / settings -->

let _indexTableItemDefault = {
  label: "序号",
  key: "",
  type: "index",
  width: 60,
  fixed: 'left',
  showOverflowTooltip: true,
}
let _selectionTableItemDefault = {
  label: "选项",
  key: "",
  type: "selection",
  fixed: 'left',
  align: "center",
  width: 40,

}
let _expandTableItemDefault = {
  label: "展开",
  key: "",
  type: "expand",
  fixed: 'left',
  width: 60,
}
let _settingsTableItemDefault = {
  label: "设置",
  key: "",
  type: "settings",
  fixed: 'right',
  align: "center",
  buttonList: []
}


const keyListCOM = computed(() => {

  console.log('keyListCOM', props)
  let _keyList = JSON.parse(JSON.stringify(props.keyList));
  let _isShowExpand = props.isShowExpand;
  let _isShowSelection = props.isShowSelection;
  let _isShowIndex = props.isShowIndex;
  let _isShowSettings = props.isShowSettings;
  let _expandTableItem = _expandTableItemDefault;
  let _selectionTableItem = _selectionTableItemDefault;
  let _indexTableItem = _indexTableItemDefault;
  let _settingsTableItem = _settingsTableItemDefault;
  if (!_isShowExpand) {
    _expandTableItem = ''
  }
  if (!_isShowSelection) {
    _selectionTableItem = ''
  }
  if (!_isShowIndex) {
    _indexTableItem = ''
  }
  if (!_isShowSettings) {
    _settingsTableItem = ''
  }


  _keyList = [
    _expandTableItem,
    _selectionTableItem,
    _indexTableItem,
    ..._keyList,
    _settingsTableItem
  ].filter(item => item != '')


  // 每一列加上 不重复key ， 用于视图刷新正常
  _keyList = _keyList?.map(item=> {
    item.$key = Symbol()
    return item;
  })

  console.log(_keyList);
  return _keyList
})


//const emits = defineEmits(["update:modelValue"]);
const emits = defineEmits(['onSettingsButtonClick']);

const defaultCOM = computed(() => {
  return '';
});

//watch(
//  () => props, (newValue, oldValue) => {
//    //console.log('newValue', newValue);
//    //console.log('oldValue', oldValue);
//    // defaultActive = newValue.path;
//
//  },
//   {immediate: true}
//);


const goTo = (key, data) => {
  // console.log(key, data);
  if(key == 'onSettingsButtonClick'){
    emits('onSettingsButtonClick',data)

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

</style>