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
      :selectable="selectable"
      :beforeSwitchChange="beforeSwitchChange"
      :pageData="pageData"
      @onSettingsButtonClick="(data)=>goTo('onSettingsButtonClick',data)"
      @onSwitchChange="(data) =>  goTo('onSwitchChange', data) "
    >

      <template v-for="(item, index) in slotListCOM()" :key="index" #[item.name]="data">
        <slot :name="item.name" :data="data.data"></slot>
      </template>

    </d-table-list>

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
  settingsConfig: {
    type: [Object],
    default:{},
  },
  selectable:{
    type:[Function]
  },
  beforeSwitchChange:{
    type:[Function,Boolean],
    default:true
  }
});


// <!--selection / index / expand / settings -->

let _tableIndexDefault = {
  label: "序号",
  key: "",
  type: "index",
  width: 60,
  fixed: 'left',
  showOverflowTooltip: true,
}
let _tableSelectionDefault = {
  label: "选项",
  key: "",
  type: "selection",
  fixed: 'left',
  align: "center",
  width: 40,

}
let _tableExpandDefault = {
  label: "展开",
  key: "",
  type: "expand",
  fixed: 'left',
  width: 60,
}
let _tableSettingsDefault = {
  label: "设置",
  key: "",
  type: "settings",
  fixed: 'right',
  align: "center",
  isShow:false,
  buttonList: [
    {
      name: "详情",
      key: "detail",
      type: 'button',
    },
    {
      type: "dropdown",
      trigger: "click", // hover/click/contextmenu
      placement: "bottom-start",
      teleported: false,//top/top-start/top-end/bottom/bottom-start/bottom-end
      list: [
        {
          name: "修改",
          key: "edit"
        },
        {
          name: "删除",
          key: "delete"
        },

        {
          name: "设置",
          key: "delete",
          divided: true,
        }
      ]
    }
  ]
}


const keyListCOM = computed(() => {

  console.log('keyListCOM', props)
  let _keyList = JSON.parse(JSON.stringify(props.keyList));
  let _settingsConfig = JSON.parse(JSON.stringify(props.settingsConfig))
  let _isShowExpand = props.isShowExpand;
  let _isShowSelection = props.isShowSelection;
  let _isShowIndex = props.isShowIndex;
  let _isShowSettings = props.isShowSettings;
  let _tableExpand = _tableExpandDefault;
  let _tableSelection = _tableSelectionDefault;
  let _tableIndex = _tableIndexDefault;
  let _tableSettings = {
    ..._tableSettingsDefault, // 默认
    ..._settingsConfig,
    type: "settings",

  };




  if (!_isShowExpand) {
    _tableExpand = ''
  }
  if (!_isShowSelection) {
    _tableSelection = ''
  }
  if (!_isShowIndex) {
    _tableIndex = ''
  }
  if (!_tableSettings.isShow) {
    _tableSettings = ''
  }


  _keyList = [
    _tableExpand,
    _tableSelection,
    _tableIndex,
    ..._keyList,
    _tableSettings
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
const emits = defineEmits(['onSettingsButtonClick','onSwitchChange']);

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
  if(key == 'onSwitchChange'){
    emits('onSwitchChange',data)
  }
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