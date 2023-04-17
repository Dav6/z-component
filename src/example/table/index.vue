<!--
  author: 戴伟
  date: 020 2022/12/20 11:35:52
  file: src\example\table\index.vue
  des:
    do.....
-->

<template>
  <Component
      ref="formModelRef"
      is="d-table-model"
      :list="list"
      :keyList="keyList"
      :pageData="pageData"
      :isShowExpand="isShowExpand"
      :isShowSelection="isShowSelection"
      :isShowIndex="isShowIndex"
      :isShowSettings="isShowSettings"
      :settingsConfig="settingsConfig"
      :selectable="selectable"
      :beforeSwitchChange="beforeSwitchChange"
      :header-cell-class-name="headerRowClassNameFN"

      row-key="recordId"
      height="100%"
      @selection-change="data=>goTo('selectionChange',data)"
      @select="(selection, row)=>goTo('select',{selection, row})"
      @select-all="(selection, row)=>goTo('selectAll',{selection, row})"
      @onSettingsButtonClick="(data)=>goTo('onSettingsButtonClick',data)"
      @sectionDelete="data=>goTo('sectionDelete',data)"
      v-bind="$attrs"

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
  {
    label: "状态", type: "switch", key: "status",
    showOverflowTooltip: false
  },

  {label: "图片", type: "image", key: "image", size: "24 24", width: 100, limit: 2, showOverflowTooltip: false},
  {label: "自定义", type: "custom", customName: "test", key: "personnelRoleName", showOverflowTooltip: true},
  {label: "时间", type: "time", format: 'YYYY-MM-DD HH:mm:ss', key: "createTime", showOverflowTooltip: true},
])
//item.format : 'YYYY-MM-DD HH:mm:ss'"


const settingsConfig = ref({
  label: "设置",
  fixed: 'right',
  type: '123123',
  align: "center",
  width: 200,
  isShow: true,
  divided: true,
  buttonList: [
    {
      name: "编辑",
      key: "edit",
      type: 'button',
    },
    {
      name: "详情",
      key: "detail",
      type: 'button',
    },
    {
      name: "更多",
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
  page: 1,
  pageSize: 20,
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
    image: image,
    "passStatusName": "通行失败,陌生人",
    "orgName": "泽瑞集团",
    "createTime": "2022-12-19 11:17:20",
    "children":[
      {
        "recordId": "15920738537366978257",
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
      }
    ]
  }, {
    "recordId": "16046772215632420449",
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
    "createTime": "2022-12-19 11:17:15",
    image: [image],

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
  },
  {
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
    "createTime": "2022-11-14 16:35:59",
    children:[
      {
        "recordId": "159207385375336697857",
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
      }
    ]
  },
])


list.value?.map((item, index) => {
  if (index % 3 == 0) {
    item.status = true
    item.selectable = true;
  } else {
    item.status = false
    item.selectable = false;

  }
})

const selectable = (row, index) => {
  // console.log('selectable',row,index)
  return false;//|| row.selectable

}

const headerRowClassNameFN = (data)=>{
  // console.log('headerRowClassNameFN-外')

  return ''
}


const beforeSwitchChange = (data) => {
  console.log('beforeSwitchChange', data)
  return false;
  return new Promise((resolve, reject) => {
    // resolve(true)
    // reject(false)
  })
}


const goTo = (key, data) => {
  console.log(key, data);
  if(key == 'sectionDelete'){

  }
  if (key == 'onSettingsButtonClick') {
    console.log(data?.data.deviceName)
    data.data.deviceName = 3000
  }
}

const formModelRef = ref()

// setTimeout(() => {
//   console.log('formModelRef', formModelRef.value.getRef());
//   console.log('list', list);
//   console.log('formModelRef', formModelRef.value.getRef()?.toggleRowSelection(list.value[0], undefined));
// }, 1000)


// 接口请求方法放这
const init = () => {
  //getList();

}

// 统一执行初始化方法
init();


</script>

<style scoped lang="less">

</style>