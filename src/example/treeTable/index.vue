<!--
  author: 戴伟
  date: 020 2022/12/20 11:35:52
  file: src\example\table\index.vue
  des:
    do.....
-->

<template>
  <Component
      is="d-table-model"
      :list="list"
      :keyList="keyList"
      :pageData="pageData"
      :isShowExpand="isShowExpand"
      :isShowSelection="isShowSelection"
      :isShowIndex="isShowIndex"
      :settingsConfig="settingsConfig"
      height="100%"
      @select="(selection, row)=>goTo('select',{selection, row})"
      @onSettingsButtonClick="(data)=>goTo('onSettingsButtonClick',data)"
      row-key="id"
      :tree-props="{children:'childDevices'}"
      v-bind="$props"

  >
    <template #expand="{data}">
      <!-- {{  images  }} -->
      <div>
        {{ data?.row }}
      </div>
    </template>

    <template #test="{data}">
      <!-- {{  images  }} -->
      {{ data?.row }}

    </template>


  </Component>
</template>

<script setup>
defineOptions({
  name: "表格treeTable",
  key: 'example-table',
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

const keyList = ref([
  {label: "设备名称", key: "name", showOverflowTooltip: true},
  {label: "设备编号", key: "serialNum", showOverflowTooltip: true},
  {label: "设备型号", key: "model", showOverflowTooltip: true},
  {label: "设备ID", key: "id", showOverflowTooltip: true},
  {label: "位置", key: "location", showOverflowTooltip: true},
  {
    label: "设备二维码",
    type: "image",
    key: "qr",
    size: "24 24",
    width: 100,
    limit: 1,
    showOverflowTooltip: false,
  },
  // 0 1
  {
    label: "使用状态", key: "status", showOverflowTooltip: true,
    type: "custom",
    customName: "status",
  },

  // {label: "自定义", type: "custom", customName: "test", key: "personnelRoleName", showOverflowTooltip: true},
  // {label: "设备二维码", type: "time", format: 'YYYY-MM-DD HH:mm:ss', key: "createTime", showOverflowTooltip: true},
])
//item.format : 'YYYY-MM-DD HH:mm:ss'"


const settingsConfig = ref({
  label: "设置",
  fixed: 'right',
  type: '123123',
  align: "center",
  width: 100,
  isShow: true,
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
})


const isShowExpand = ref(false);
const isShowSelection = ref(false)
const isShowIndex = ref(false)
// setTimeout(()=>{
//   // isShowExpand.value = true
//   isShowSelection.value = true
// },2000)
// setTimeout(()=>{
//   // isShowExpand.value = true
//   isShowSelection.value = true
// },4000)
// setTimeout(()=>{
//   // isShowExpand.value = true
//   isShowIndex.value = true
// },6000)
// setTimeout(()=>{
//   // isShowExpand.value = true
//   isShowSettings.value = true
// },8000)

const pageData = ref({
  page: 1,
  pageSize: 20,
})
const image = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-93dd36bf20dad23a01a51698733ed306_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674282885&t=f05370c806711f9117370dd745bb0d19'
const list = ref([
  {
    "id": "446763612271280132",
    "name": "ZHERUI_PRO_TEST002",
    "type": "a108HNvyPXY",
    "nodeType": 1,
    "nodeTypeName": "设备",
    "dataProto": 6,
    "model": " ZR-HC-SL8010EFV-C",
    "serialNum": "ZHERUI_PRO_TEST002",
    "gatewayId": "446620761306759172",
    "registerMode": 0,
    "status": 1,
    "network": 1,
    "childDevices": [
      {
        "id": "446771235116810244",
        "name": "DH-IAS1262C-25B0039",
        "type": "ZR-AS-WD",
        "nodeType": 3,
        "nodeTypeName": "子设备",
        "dataProto": 2,
        "model": "DH-IAS1262C-25B",
        "serialNum": "8C05DA0PGE00039",
        "gatewayId": "446620308019937284",
        "parentDeviceId": 446771235083255812,
        "registerMode": 0,
        "status": 1,
        "network": 1,
        "address": "8C05DA0PGE00039"
      }, {
        "id": "446771235100033028",
        "name": "接插座",
        "type": "ZR-AS-WD",
        "nodeType": 3,
        "nodeTypeName": "子设备",
        "dataProto": 2,
        "model": "DH-IAS1262C-25B",
        "serialNum": "8C05DA0PGE00046",
        "gatewayId": "446620308019937284",
        "parentDeviceId": 446771235083255812,
        "registerMode": 0,
        "status": 1,
        "network": 1,
        "address": "8C05DA0PGE00046"
      }
    ]
  }, {
    "id": "446763612338388996",
    "name": "ZHERUI_PRO_TEST001",
    "type": "a108HNvyPXY",
    "nodeType": 1,
    "nodeTypeName": "设备",
    "dataProto": 6,
    "model": " ZR-HC-SL8010EFV-C",
    "serialNum": "ZHERUI_PRO_TEST001",
    "gatewayId": "446620761306759172",
    "registerMode": 0,
    "network": 1
  }, {
    "id": "446763612371943428",
    "name": "ZHERUI_S3_TEST001",
    "type": "a1HI5VlUwUl",
    "nodeType": 1,
    "nodeTypeName": "设备",
    "dataProto": 6,
    "model": "ZR-HC-SL5110E-C",
    "serialNum": "ZHERUI_S3_TEST001",
    "gatewayId": "446620761306759172",
    "registerMode": 0,
    "status": 1,
    "network": 1
  }, {
    "id": "446763848997797892",
    "name": "人体体征检测雷达",
    "type": "ZR-HC-SR60",
    "nodeType": 1,
    "nodeTypeName": "设备",
    "dataProto": 2,
    "model": "ZR-HC-SR60",
    "username": "admin",
    "password": "admin123456",
    "serialNum": "8L05006PAJ00148",
    "gatewayId": "446620308019937284",
    "registerMode": 0,
    "status": 1,
    "network": 1,
    "address": "192.168.12.110:37777",
    "mac": "3c:e3:6b:32:c9:44"
  }, {
    "id": "446771235083255812",
    "name": "智能空开网关",
    "type": "ZR-AS-WG",
    "nodeType": 2,
    "nodeTypeName": "网关设备",
    "dataProto": 2,
    "model": "DH-IEG1SC-W",
    "username": "admin",
    "password": "admin123",
    "serialNum": "7M05473PAZ00048",
    "gatewayId": "446620308019937284",
    "registerMode": 0,
    "status": 1,
    "network": 1,
    "address": "192.168.12.84:37777",
    "mac": "c0:39:5a:83:ff:e6",
    "childDevices": [
      {
        "id": "446771235116810244",
        "name": "DH-IAS1262C-25B0039",
        "type": "ZR-AS-WD",
        "nodeType": 3,
        "nodeTypeName": "子设备",
        "dataProto": 2,
        "model": "DH-IAS1262C-25B",
        "serialNum": "8C05DA0PGE00039",
        "gatewayId": "446620308019937284",
        "parentDeviceId": 446771235083255812,
        "registerMode": 0,
        "status": 1,
        "network": 1,
        "address": "8C05DA0PGE00039"
      }, {
        "id": "446771235100033028",
        "name": "接插座",
        "type": "ZR-AS-WD",
        "nodeType": 3,
        "nodeTypeName": "子设备",
        "dataProto": 2,
        "model": "DH-IAS1262C-25B",
        "serialNum": "8C05DA0PGE00046",
        "gatewayId": "446620308019937284",
        "parentDeviceId": 446771235083255812,
        "registerMode": 0,
        "status": 1,
        "network": 1,
        "address": "8C05DA0PGE00046"
      }
    ]
  }])


const goTo = (key, data) => {
  console.log(key, data);
  if (key == 'onSettingsButtonClick') {
    console.log(data?.data.deviceName)
    data.data.deviceName = 3000
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