<!--
  author: 戴伟
  date: 020 2022/12/20 11:35:52
  file: src\example\table\index.vue
  des:
    do.....
-->

<template>
  <d-table-model
    :list="list"
    :keyList="keyList"
    :pageData="pageData"
    :isShowExpand="isShowExpand"
    :isShowSelection="isShowSelection"
    :isShowIndex="isShowIndex"
    :isShowSettings="isShowSettings"
    :settingsButtonList="settingsButtonList"
    height="100%"
    @select="(selection, row)=>goTo('select',{selection, row})"

    @onSettingsButtonClick="(data)=>goTo('onSettingsButtonClick',data)"
  >
    <template #expand="{data}">
      <!-- {{  images  }} -->
      <div>
        {{ data?.row}}
      </div>
    </template>

    <template #test="{data}">
      <!-- {{  images  }} -->
      {{ data?.row}}

    </template>


  </d-table-model>
</template>

<script setup>
defineOptions({
  name: "表格table",
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
  {label: "id", key: "recordId", showOverflowTooltip: true},
  {label: "设备名称", key: "deviceName", showOverflowTooltip: true},
  {label: "公司", key: "orgName", showOverflowTooltip: true},
  {label: "图片", type:"image", key: "image", size:"",width:300,  showOverflowTooltip: true},
  {label: "自定义", type:"custom",customName:"test", key: "personnelRoleName", showOverflowTooltip: true},
  {label: "时间", type:"time",format:'YYYY-MM-DD HH:mm:ss',  key: "createTime",  showOverflowTooltip: true},
])
//item.format : 'YYYY-MM-DD HH:mm:ss'"


const settingsButtonList = ref([
  {
    name:"详情",
    key:"detail",
    type:'button',
  },
  {

    type: "dropdown",
    trigger:"click", // hover/click/contextmenu
    list:[
      {
        name:"修改",
        key:"edit"
      },
      {
        name:"删除",
        key:"delete"
      },

      {
        name:"设置",
        key:"delete",
        divided:true,
      }
    ]
  }
])


const isShowExpand = ref(true);
const isShowSelection = ref(true)
const isShowIndex = ref(true)
const isShowSettings = ref(true)
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
  page:1,
  pageSize:20,
})
const image = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-93dd36bf20dad23a01a51698733ed306_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1674282885&t=f05370c806711f9117370dd745bb0d19'
const list = ref([
  {
  "recordId": "1604677243008716802",
  "personnelRole": 5,
  "personnelRoleName": "未授权人员",
  "personnelName": "",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 16,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  image:[image,image,image,image],
  "passStatusName": "通行失败,陌生人",
  "orgName": "泽瑞集团",
  "createTime": "2022-12-19 11:17:20"
}, {
  "recordId": "1604677221563240449",
  "personnelRole": 5,
  "personnelRoleName": "未授权人员",
  "personnelName": "",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 16,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行失败,陌生人",
  "orgName": "泽瑞集团",
  "createTime": "2022-12-19 11:17:15"
}, {
  "recordId": "1604677207931752449",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1588335490878144513",
  "personnelName": "小美",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-18 09:26:32"
}, {
  "recordId": "1593146368542228482",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1588335490878144513",
  "personnelName": "小美",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-17 15:37:47"
}, {
  "recordId": "1593047262029266945",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385445433346",
  "personnelName": "人员2",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-17 09:03:59"
}, {
  "recordId": "1593047236758585345",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385487376385",
  "personnelName": "吴",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-17 09:03:53"
}, {
  "recordId": "1593047207104856065",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385445433346",
  "personnelName": "人员2",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-17 09:03:02"
}, {
  "recordId": "1592801173556543489",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1588335490878144513",
  "personnelName": "小美",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-16 16:46:05"
}, {
  "recordId": "1592776673519583233",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385487376385",
  "personnelName": "吴",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-16 15:08:45"
}, {
  "recordId": "1592772502867263490",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385445433346",
  "personnelName": "人员2",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-16 14:52:10"
}, {
  "recordId": "1592765501286236161",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1588335490878144513",
  "personnelName": "小美",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-16 14:24:20"
}, {
  "recordId": "1592395262841176065",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385487376385",
  "personnelName": "吴",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-15 13:53:10"
}, {
  "recordId": "1592395233296498689",
  "personnelRole": 5,
  "personnelRoleName": "未授权人员",
  "personnelName": "",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 16,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行失败,陌生人",
  "orgName": "泽瑞集团",
  "createTime": "2022-11-15 13:53:03"
}, {
  "recordId": "1592360906424696833",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385487376385",
  "personnelName": "吴",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-15 11:36:37"
}, {
  "recordId": "1592358873340690433",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385445433346",
  "personnelName": "人员2",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-15 11:28:32"
}, {
  "recordId": "1592358841573031937",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1588335490878144513",
  "personnelName": "小美",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-15 11:28:25"
}, {
  "recordId": "1592328511310905346",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385445433346",
  "personnelName": "人员2",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-15 09:27:54"
}, {
  "recordId": "1592326643352453122",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1588335490878144513",
  "personnelName": "小美",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-15 09:20:28"
}, {
  "recordId": "1592081346663661570",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1587357385445433346",
  "personnelName": "人员2",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-14 17:05:45"
}, {
  "recordId": "1592073853736697857",
  "personnelRole": 1,
  "personnelRoleName": "企业员工",
  "employeeId": "1588335490878144513",
  "personnelName": "小美",
  "deviceId": 1581915886924595201,
  "deviceName": "华屹",
  "passStatus": 1,
  "passType": {
    "type": 1,
    "name": "人脸"
  },
  "passStatusName": "通行成功",
  "orgName": "泽瑞集团",
  "companyId": 1564911314820681729,
  "companyName": "泽瑞集团",
  "createTime": "2022-11-14 16:35:59"
}])








const goTo = (key,data)=>{
  console.log(key,data);
  if(key == 'onSettingsButtonClick'){
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